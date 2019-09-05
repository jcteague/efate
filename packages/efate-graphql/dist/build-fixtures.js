"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const efate_1 = require("efate");
const scalar_fixture_map_1 = require("./scalar-fixture-map");
const debugFn = require("debug");
const debug = debugFn('efate:graphql:build-fixture');
const kindsToConvertToFixtures = [
    graphql_1.Kind.OBJECT_TYPE_DEFINITION,
    graphql_1.Kind.INPUT_OBJECT_TYPE_DEFINITION
];
const enumFilter = (def) => def.kind === graphql_1.Kind.ENUM_TYPE_DEFINITION;
const objectNodeFilter = (def) => {
    const isConvertibleToFixture = kindsToConvertToFixtures.includes(def.kind);
    const objectDef = def;
    const notMutationOrQuery = objectDef.name.value !== 'Mutation' && objectDef.name.value !== 'Query';
    return isConvertibleToFixture && notMutationOrQuery;
};
const isObjectType = (node) => typeof node.fields !== 'undefined';
const isNamedTypeNode = (node) => typeof node.name !== 'undefined';
const isNonNullTypeNode = (node) => typeof node.type !== 'undefined';
const getTypeNameFromTypeNode = (type) => {
    let typeName = null;
    if (type && isNonNullTypeNode(type)) {
        typeName = type.type.name.value;
    }
    else if (type && isNamedTypeNode(type)) {
        typeName = type.name.value;
    }
    return typeName;
};
const isFieldKnownScalar = (typeName) => {
    return typeName && scalar_fixture_map_1.scalarMap[typeName.toUpperCase()];
};
const isListTypeNode = (node) => typeof node.type !== 'undefined';
class SchemaFixtureBuilder {
    constructor(graphqlDocument, options) {
        this.customScalarBuilders = options.scalarBuilders || [];
        this.enumDefinitions = graphqlDocument.definitions.filter(enumFilter);
        this.objectNodes = graphqlDocument.definitions.filter(objectNodeFilter);
        // console.log(this.objectNodes);
        this.fixtureDefs = this.objectNodes.filter(isObjectType).map((x) => this.objectNodeToFixtureDef(x));
    }
    objectNodeToFixtureDef(node) {
        const typeName = node.name.value;
        const typeKind = node.kind;
        debug(`--- ${typeName}`);
        // @ts-ignore
        const fieldBuilders = node.fields.map((f) => this.mapFieldsToFieldBuilder(f));
        return {
            typeName,
            typeKind,
            fixture: new efate_1.default(...fieldBuilders),
        };
    }
    isEnumeratedField(field) {
        const typeName = getTypeNameFromTypeNode(field.type);
        if (!typeName) {
            return false;
        }
        const enumDef = this.enumDefinitions.find(e => e.name.value === typeName);
        return typeof enumDef !== 'undefined';
    }
    isCustomScalarProvided(typeName) {
        const customBuilders = this.customScalarBuilders.find(s => s.typeName === typeName);
        return typeof customBuilders !== 'undefined';
    }
    mapFieldsToFieldBuilder(field) {
        // console.log(field);
        const name = field.name.value;
        const typeName = getTypeNameFromTypeNode(field.type);
        debug('--- ---field name: %s, kind: %s, type: %s', name, field.type.kind, typeName);
        const customScalar = this.customScalarBuilders.find(s => s.typeName === typeName);
        debug('custom scalar %o', customScalar);
        if (typeName && typeof customScalar !== 'undefined') {
            const customBuilder = customScalar.fieldBuilder;
            const boundBuilder = customBuilder.bind(name);
            debug('using custom scalar for %s: %o', typeName, boundBuilder);
            return boundBuilder();
        }
        if (typeName && isFieldKnownScalar(typeName)) {
            debug(`--- --- ${name}: ${typeName}`);
            const builder = scalar_fixture_map_1.scalarMap[typeName.toUpperCase()].bind(name);
            debug('scalar builder: %o', scalar_fixture_map_1.scalarMap[typeName.toUpperCase()]);
            return builder();
        }
        if (typeName && this.isEnumeratedField(field)) {
            debug('--- --- enumerated field: %o', field);
            const enumDef = this.enumDefinitions.find(e => e.name.value === typeName);
            if (typeof enumDef !== 'undefined' && typeof enumDef.values !== 'undefined') {
                debug('enum: %o', enumDef);
                const values = enumDef.values.map(d => d.name.value);
                debug('enum values: %o', values);
                const builder = name.pickFrom(values);
                debug(builder);
                return builder;
            }
            throw new Error(`Could not create type from enumerated type: ${typeName}`);
        }
        throw new Error(`Field Not Supported: ${name}: ${typeName}`);
    }
}
function buildFixtures(graphqlDocument, options) {
    const fixtureBuilder = new SchemaFixtureBuilder(graphqlDocument, options);
    return fixtureBuilder.fixtureDefs;
}
exports.buildFixtures = buildFixtures;

import {DocumentNode,
  DefinitionNode,
  Kind,
  ObjectTypeDefinitionNode,
  FieldDefinitionNode,
  EnumTypeDefinitionNode,
  NonNullTypeNode,
  NamedTypeNode,
  ListTypeNode,
  TypeNode,
} from 'graphql';
import Fixture, {BuilderReturnFunction} from "efate";
import {BuildFixtureOptions, FixtureDefinition, CustomScalarFieldBuilder} from "./types";
import {scalarMap} from './scalar-fixture-map';
import  * as debugFn from 'debug';
const debug = debugFn('efate:graphql:build-fixture');

const kindsToConvertToFixtures: string[] = [
  Kind.OBJECT_TYPE_DEFINITION,
  Kind.INPUT_OBJECT_TYPE_DEFINITION
];


const enumFilter = (def: DefinitionNode): boolean => def.kind === Kind.ENUM_TYPE_DEFINITION;

const objectNodeFilter = (def: DefinitionNode): boolean => {
  const isConvertibleToFixture = kindsToConvertToFixtures.includes(def.kind);
  const objectDef = def as ObjectTypeDefinitionNode;
  const notMutationOrQuery = objectDef.name.value !== 'Mutation' && objectDef.name.value !== 'Query';
  return isConvertibleToFixture && notMutationOrQuery;
};

const isObjectType = (node: DefinitionNode ): node is ObjectTypeDefinitionNode =>
  typeof (node as ObjectTypeDefinitionNode).fields !== 'undefined';

const isNamedTypeNode = (node: TypeNode): node is NamedTypeNode  =>
  typeof (node as NamedTypeNode).name !== 'undefined';

const isNonNullTypeNode = (node: TypeNode): node is NonNullTypeNode  =>
  typeof (node as NonNullTypeNode).type !== 'undefined';

const getTypeNameFromTypeNode = (type: TypeNode): string | null =>{
  debug('--- --- type: %o', type)
  let typeName: string | null = null;
  // if (type.kind === 'ListType') {
  //   type = type.type;
  // }
  if (type && isNonNullTypeNode(type)){
    typeName = (type.type as NamedTypeNode).name.value;
  } else if (type && isNamedTypeNode(type)) {
    typeName = (type as NamedTypeNode).name.value;
  }
  return typeName;
};

const isFieldKnownScalar = (typeName: string): boolean => {
   return typeName && scalarMap[typeName.toUpperCase()]
};

const isListTypeNode = (node: TypeNode): node is ListTypeNode =>
  typeof (node as ListTypeNode).type !== 'undefined';

class SchemaFixtureBuilder{
  public fixtureDefs: FixtureDefinition[] = [];
  private enumDefinitions: EnumTypeDefinitionNode[];
  private objectNodes: ObjectTypeDefinitionNode[];
  private customScalarBuilders: CustomScalarFieldBuilder[];


  constructor(graphqlDocument: DocumentNode, options:BuildFixtureOptions){
    this.customScalarBuilders = options.scalarBuilders || [];
    this.enumDefinitions = graphqlDocument.definitions.filter(enumFilter) as EnumTypeDefinitionNode[];
    this.objectNodes = graphqlDocument.definitions.filter(objectNodeFilter) as ObjectTypeDefinitionNode[];
    // console.log(this.objectNodes);
    this.objectNodes.forEach(schemaObj => {
      if(isObjectType(schemaObj)){
        this.fixtureDefs.push(this.objectNodeToFixtureDef(schemaObj));
      }
    });
  }

  private objectNodeToFixtureDef(node: ObjectTypeDefinitionNode): FixtureDefinition {
    const typeName = node.name.value;
    const typeKind = node.kind;
    debug(`--- ${typeName}`);

    // @ts-ignore
    const fieldBuilders: Array<string | FieldBuilder> = node.fields.map((f) => this.mapFieldsToFieldBuilder(f));
    const fixtureDef =  {
      typeName,
      typeKind,
      fixture: new Fixture(...fieldBuilders),
    };
    debug('created fixture def: %o', fixtureDef);
    return fixtureDef;

  }
  private isEnumeratedField(type: TypeNode): boolean {
    const typeName = getTypeNameFromTypeNode(type);
    if (!typeName) { return false; }
    const enumDef = this.enumDefinitions.find(e => e.name.value === typeName);
    return typeof enumDef !== 'undefined';

  }
  private isCustomScalarProvided(typeName: string): boolean {
    const customBuilders = this.customScalarBuilders.find(s => s.typeName === typeName);
    return typeof customBuilders !== 'undefined';
  }
  private isSchemaObjectType(typeName: string): boolean {
    return this.objectNodes.find(n => n.name.value === typeName) !== null;
  }

  private mapFieldsToFieldBuilder(fieldName: string, fieldKind, string: type: TypeNode): BuilderReturnFunction {
    // console.log(field);
    const typeName = getTypeNameFromTypeNode(type);
    debug('--- --- field name: %s, kind: %s, type: %s', fieldName, kind, typeName);

    // if(field.kind === 'ListType'){
    //   const builder = this.mapFieldsToFieldBuilder(field);
    //
    // }

    const customScalar = this.customScalarBuilders.find(s => s.typeName === typeName);
    if(typeName && typeof customScalar !== 'undefined'){
      debug('--- --- custom scalar');
      const customBuilder = customScalar.fieldBuilder;
      const boundBuilder = customBuilder.bind(fieldName);
      debug('--- --- using custom scalar for %s: %o', typeName, boundBuilder);
      return boundBuilder();
    }

    if(typeName && isFieldKnownScalar(typeName)){
      debug(`--- --- ${fieldName}: ${typeName}`);
      const builder = scalarMap[typeName.toUpperCase()].bind(fieldName);
      debug('--- --- scalar builder: %o', scalarMap[typeName.toUpperCase()]);
      return builder();
    }

    if(typeName && this.isEnumeratedField(type)){
      debug('--- --- enumerated field: %o', fieldName);
      const enumDef = this.enumDefinitions.find(e => e.name.value === typeName);
      if(typeof enumDef !== 'undefined' && typeof enumDef.values !== 'undefined'){
        debug('enum: %o', enumDef);
        const values =  enumDef.values.map(d => d.name.value);
        debug('--- --- enum values: %o', values);
        const builder = fieldName.pickFrom(values);
        return builder;
      }
      throw new Error(`Could not create type from enumerated type: ${typeName}`);
    }
    if(typeName && this.isSchemaObjectType(typeName)){
      debug('--- --- building from fixture');
      debug('--- --- fixturedefs %O', this.fixtureDefs);
      const fixtureDef = this.fixtureDefs.find(def => def.typeName === typeName);
      debug('--- --- creating from fixture: %o', fixtureDef);
      if (typeof fixtureDef !== 'undefined'){
        const fixture = fixtureDef.fixture as Fixture;
        const builder =  fieldName.fromFixture(fixture);
        debug(builder);
        return builder;
      }
    }
    throw new Error(`Field Not Supported: ${fieldName}: ${typeName}`);
  }
}

export function buildFixtures(graphqlDocument: DocumentNode, options: BuildFixtureOptions): FixtureDefinition[]{
  const fixtureBuilder = new SchemaFixtureBuilder(graphqlDocument, options);
  return fixtureBuilder.fixtureDefs;
}
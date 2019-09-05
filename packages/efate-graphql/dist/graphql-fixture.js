"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const graphql_1 = require("graphql");
const build_fixtures_1 = require("./build-fixtures");
class GraphqlFixture {
    constructor(options) {
        this.fixtures = [];
        let schema;
        if (options.schemaSrcPath) {
            const schemaContents = fs.readFileSync(options.schemaSrcPath, { encoding: 'utf8' });
            schema = graphql_1.parse(schemaContents);
            this.fixtures = build_fixtures_1.buildFixtures(schema, {});
        }
    }
}
exports.default = GraphqlFixture;

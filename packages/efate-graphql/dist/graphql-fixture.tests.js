"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_fixture_1 = require("./graphql-fixture");
describe('graphql-schema-tests', () => {
    it('should generate a fixture for a query', function () {
        const graphqlFixture = new graphql_fixture_1.default({ schemaSrcPath: `${__dirname}/../fixtures/schema.graphql` });
    });
});

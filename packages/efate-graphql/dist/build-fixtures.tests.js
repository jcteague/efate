"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const build_fixtures_1 = require("./build-fixtures");
const graphql_1 = require("graphql");
const fs = require("fs");
const efate_1 = require("efate");
describe.only('buildFixtures', () => {
    const schema = fs.readFileSync(`${__dirname}/../fixtures/schema.graphql`, { encoding: 'utf8' });
    const document = graphql_1.parse(schema);
    const buildOptions = {
        scalarBuilders: [{ typeName: 'DateTime', fieldBuilder: efate_1.propertyBuilders.asDateBuilder }]
    };
    it('should build fixtures for all types in schema', function () {
        const fixtures = build_fixtures_1.buildFixtures(document, buildOptions);
        chai_1.expect(fixtures.length).to.equal(4);
    });
    it('should define builders for known scalar types', function () {
        const fixtures = build_fixtures_1.buildFixtures(document, buildOptions);
        const userFixture = fixtures.find(f => f.typeName === 'User');
        chai_1.expect(userFixture).to.exist;
        const fixture = userFixture.fixture.create();
        chai_1.expect(fixture).to.have.property('id');
        chai_1.expect(fixture).to.have.property('firstName');
        chai_1.expect(fixture).to.have.property('lastName');
    });
    it('should define builder for enumeration types', function () {
        const fixtures = build_fixtures_1.buildFixtures(document, buildOptions);
        const postFixture = fixtures.find(f => f.typeName === 'Post');
        const fixture = postFixture.fixture.create();
        chai_1.expect(fixture).to.have.property('status');
        chai_1.expect(fixture.status).to.be.oneOf(['NOT_PUBLISHED', 'PUBLISHED']);
    });
    it('should use custom scalar builders', function () {
        const fixtures = build_fixtures_1.buildFixtures(document, buildOptions);
        const postFixture = fixtures.find(f => f.typeName === 'Post');
        const fixture = postFixture.fixture.create();
        chai_1.expect(fixture).to.have.property('createdDate');
        chai_1.expect(fixture.createdDate).to.be.an.instanceof(Date);
    });
});

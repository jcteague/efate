import {expect} from 'chai';
import {buildFixtures} from './build-fixtures';
import {parse, DocumentNode} from 'graphql';
import * as fs from 'fs';
import {propertyBuilders} from 'efate';
import {BuildFixtureOptions, FixtureDefinition} from "./types";
describe.only('buildFixtures',  () =>{
    const schema = fs.readFileSync(`${__dirname}/../fixtures/schema.graphql`, {encoding: 'utf8'});
    const document: DocumentNode = parse(schema);
    const buildOptions: BuildFixtureOptions = {
      scalarBuilders: [{typeName: 'DateTime', fieldBuilder: propertyBuilders.asDateBuilder}]

    };

    it('should build fixtures for all types in schema', function () {
        const fixtures = buildFixtures(document, buildOptions);
        expect(fixtures.length).to.equal(4)
    });
    it('should define builders for known scalar types', function () {
        const fixtures = buildFixtures(document, buildOptions);
        const userFixture = fixtures.find(f => f.typeName === 'User') as FixtureDefinition;
        expect(userFixture).to.exist;
        const fixture = userFixture.fixture.create();
        expect(fixture).to.have.property('id');
        expect(fixture).to.have.property('firstName');
        expect(fixture).to.have.property('lastName');

    });
    it('should define builder for enumeration types', function () {
      const fixtures = buildFixtures(document, buildOptions);
      const postFixture = fixtures.find(f => f.typeName === 'Post') as FixtureDefinition;
      const fixture = postFixture.fixture.create();
      expect(fixture).to.have.property('status');
      expect(fixture.status).to.be.oneOf(['NOT_PUBLISHED', 'PUBLISHED'])

    });
    it('should use custom scalar builders', function () {
      const fixtures = buildFixtures(document, buildOptions);
      const postFixture = fixtures.find(f => f.typeName === 'Post') as FixtureDefinition;
      const fixture = postFixture.fixture.create();
      expect(fixture).to.have.property('createdDate');
      expect(fixture.createdDate).to.be.an.instanceof(Date);
    });
    it('should add types from other fixtures', function () {
      const fixtures = buildFixtures(document, buildOptions);
      const postFixture = fixtures.find(f => f.typeName === 'Post') as FixtureDefinition;
      const fixture = postFixture.fixture.create();
      expect(fixture).to.have.property('createdBy');
    })

})
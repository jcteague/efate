/* tslint:disable: no-unused-expression */
import * as chai from 'chai';
const expect = chai.expect;
import {BuilderReturnFunction} from 'efate';
import uuidBuilder from './index';
const uuidRegEx = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const extendFixture
describe('asUUID()',  () => {
    it('should create field with uuid',  () => {
        interface UuidFixtureExtension  {
            asUUID: () => BuilderReturnFunction;
        }

        const Fixture = extendFixture<UuidFixtureExtension>({asUUID: uuidBuilder})
        const builder = new Fixture('id'.asUUID());
        const fixture = builder.create();
        expect(fixture.id).to.exist;
        expect(fixture.id.match(uuidRegEx).length).is.greaterThan(0)
    })
});


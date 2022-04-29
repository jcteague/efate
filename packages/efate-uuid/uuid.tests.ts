/* tslint:disable: no-unused-expression */
import * as chai from 'chai';
const expect = chai.expect;
import {createFixtureFactory} from 'efate';
import {UUIDExtension, uuidFieldExtension} from './index';
const uuidRegEx = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

describe('asUUID()',  () => {
    it('should create field with uuid',  () => {


        const createFixture = createFixtureFactory<UUIDExtension>(uuidFieldExtension)
        const builder = createFixture<{id: string}>(t => {
            t.id.asUUID();
        });
        const fixture = builder.create();
        expect(fixture.id).to.exist;
        expect(fixture.id.match(uuidRegEx)?.length).is.greaterThan(0)
    })
});


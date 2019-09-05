"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable: no-unused-expression */
const chai = require("chai");
const expect = chai.expect;
const efate_1 = require("efate");
require("./index");
const uuidRegEx = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
describe('asUUID()', () => {
    it('should create field with uuid', () => {
        const builder = new efate_1.default('id'.asUUID());
        const fixture = builder.create();
        expect(fixture.id).to.exist;
        expect(fixture.id.match(uuidRegEx).length).is.greaterThan(0);
    });
});

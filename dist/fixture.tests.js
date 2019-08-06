"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable: no-unused-expression */
const chai = require("chai");
const expect = chai.expect;
const property_builders_1 = require("./property-builders");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
chai.use(sinonChai);
const fixture_1 = require("./fixture");
describe('fixture.specs', () => {
    const userFixture = new fixture_1.default('firstName', 'lastName', 'date'.asDate());
    let buildStub;
    it('should call the builders for all fixture fields', () => {
        buildStub = sinon
            .stub(property_builders_1.default, 'generateField')
            .returns({ name: 'prop', value: 'value' });
        const fixture = userFixture.create();
        expect(buildStub).to.be.callCount(3);
        buildStub.restore();
    });
    it('should add string properties to the fixture', () => {
        const fixture = userFixture.create();
        expect(fixture).to.have.property('firstName', 'firstName2');
        expect(fixture).to.have.property('lastName', 'lastName2');
    });
    describe('overrides', () => {
        it('should let users override values for specific fields on the fixture', () => {
            const fixture = userFixture.create({ firstName: 'Joey' });
            expect(fixture.firstName).to.be.equal('Joey');
        });
        it('should allow users to use a function to override the fixture', () => {
            const fixture = userFixture.create((user) => (user.firstName = 'Joey'));
            expect(fixture.firstName).to.be.equal('Joey');
        });
        it('should call create function once', () => {
            const builderFn = sinon.spy();
            const fixture = userFixture.create(builderFn);
            expect(builderFn).to.be.calledOnce;
        });
        it('can add new fields to the object through overrides', () => {
            const fixture = userFixture.create({ id: 1 });
            expect(fixture).to.have.property('id', 1);
            const f2 = userFixture.create(user => (user.id = 1));
            expect(f2).to.have.property('id', 1);
        });
    });
    describe('withValues()', () => {
        it('increments the specified value for the field value', () => {
            const fixture = new fixture_1.default('email'.withValue('userEmail')).create();
            expect(fixture.email).to.equal('userEmail1');
        });
    });
    describe('asConstant()', () => {
        it('should create fields using a constant value that does not change between instances', () => {
            const builder = new fixture_1.default('firstName'.asConstant('Bob'));
            const fixture1 = builder.create();
            const fixture2 = builder.create();
            expect(fixture1).to.have.property('firstName', 'Bob');
            expect(fixture2).to.have.property('firstName', 'Bob');
        });
    });
    describe('asDate()', () => {
        it('should return a date for the property', () => {
            const fixture = userFixture.create();
            expect(fixture).to.have.property('date');
            expect(fixture.date).to.be.an.instanceof(Date);
        });
        it('should increment the date instances when specified', () => {
            const today = new Date();
            const builder = new fixture_1.default('date'.asDate({ incrementDay: true }));
            const f1 = builder.create();
            const f2 = builder.create();
            expect(f1.date.getDate()).to.be.equal(today.getDate());
            expect(f2.date.getDate()).to.be.equal(today.getDate() + 1);
        });
    });
    describe('asNumber()', () => {
        const fb = new fixture_1.default('id'.asNumber());
        const f1 = fb.create();
        const f2 = fb.create();
        expect(f1.id).to.equal(1);
        expect(f2.id).to.equal(2);
    });
    describe('asBoolean()', () => {
        it('should create a boolean field', () => {
            const fb = new fixture_1.default('flag'.asBoolean());
            const f = fb.create();
            expect(f.flag).be.a('boolean');
        });
    });
    describe('asEmail()', () => {
        it('should populate field with an email address', () => {
            const fb = new fixture_1.default('email'.asEmail());
            const f = fb.create();
            expect(f.email).to.equal('email1@example.com');
        });
    });
    describe('asArray', () => {
        it('should create an array field on the fixture', () => {
            const builder = new fixture_1.default('roles'.asArray());
            const f = builder.create();
            expect(f.roles).to.be.an('array');
            expect(f.roles).to.eql(['roles1']);
        });
        it('should create an array with the specified length', () => {
            const builder = new fixture_1.default('roles'.asArray(3));
            const f = builder.create();
            expect(f.roles).to.have.lengthOf(3);
        });
    });
    describe('as()', () => {
        it('should create field using the function passed to it', () => {
            const builder = new fixture_1.default('field'.as(inc => `field${inc}`));
            const f = builder.create();
            expect(f.field).to.be.equal('field1');
        });
    });
    describe('pickFrom', () => {
        it('should pick from one of the provided values to populate the field', () => {
            const options = ['a', 'b', 'c', 'd'];
            const builder = new fixture_1.default('prop'.pickFrom(options));
            const f = builder.create();
            expect(options).to.include(f.prop);
        });
        it('should throw an error if options are not provided', () => {
            expect(() => new fixture_1.default('prop'.pickFrom([]))).to.throw();
        });
    });
    describe('fromFixture()', () => {
        it('creates a property based on the fixture', () => {
            const innerBuilder = new fixture_1.default('a', 'b');
            const outerBuilder = new fixture_1.default('c'.fromFixture(innerBuilder));
            const fixture = outerBuilder.create();
            expect(fixture).to.have.property('c');
            expect(fixture.c).to.eql({ a: 'a1', b: 'b1' });
        });
        it('uses overrides from the provided fixture', () => {
            const innerBuilder = new fixture_1.default('a', 'b');
            const outerBuilder = new fixture_1.default('c'.fromFixture(innerBuilder));
            const fixture = outerBuilder.create({ c: { d: 'd1', e: 'e1' } });
            expect(fixture).to.have.property('c');
            expect(fixture.c).to.eql({ d: 'd1', e: 'e1' });
        });
    });
    describe('name generators', () => {
        it('should populate fields using the name generators', () => {
            const userGenerator = new fixture_1.default('firstName'.asFirstName(), 'lastName'.asLastName(), 'fullName'.asFullName());
            const user = userGenerator.create();
            expect(user.firstName).to.be.a('string');
            expect(user.lastName).to.be.a('string');
            expect(user.fullName).to.be.a('string');
        });
    });
    describe('asLoremIpsum()', () => {
        it('should generate the lorem ipusm text', () => {
            const builder = new fixture_1.default('lorem'.asLoremIpsum());
            const f = builder.create();
            expect(f.lorem.length > 10).to.be.true;
        });
        it('should make text longer than the min', () => {
            const builder = new fixture_1.default('lorem'.asLoremIpsum({ minLength: 20, maxLength: 50 }));
            const f = builder.create();
            expect(f.lorem.length > 20).to.be.true;
            expect(f.lorem.length < 50).to.be.true;
        });
    });
});

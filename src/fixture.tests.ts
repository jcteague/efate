import * as chai from 'chai';
const expect = chai.expect;
import PropertyBuilder from './property-builders';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
chai.use(sinonChai);

import Fixture from "./fixture";
import {SinonStub} from "sinon";
interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  date: Date;
}

describe('fixture.specs', () => {
  let userFixture = new Fixture(
    'firstName',
    'lastName',
    'date'.asDate());
  let buildStub: SinonStub;
  beforeEach(()=> {

  });
  afterEach(() => {

  });

  it('should call the builders for all fixture fields', () => {
    buildStub = sinon.stub(PropertyBuilder, 'generateField' )
      .returns({name: 'prop', value: 'value'});
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
    const fixture = userFixture.create({firstName: 'Joey'}) as User;
    expect(fixture.firstName).to.be.equal('Joey');
    });

    it('should allow users to use a function to override the fixture', () => {
      const fixture = userFixture.create((user: User) => user.firstName = 'Joey') as User;
      expect(fixture.firstName).to.be.equal('Joey');
    });
    it('can add new fields to the object through overrides', () => {
      const fixture = userFixture.create({id: 1}) as User;
      expect(fixture).to.have.property('id', 1);
      const f2 = userFixture.create((user)=> user.id = 1);
      expect(f2).to.have.property('id', 1);
    });
  });

  describe('withValues()', ()=>{
    it('increments the specified value for the field value', () => {
        const fixture = new Fixture('email'.withValue('userEmail')).create() as User;
        expect(fixture.email).to.equal('userEmail1');
    });
  });

  describe('asConstant()', () =>{
    it('should create fields using a constant value that does not change between instances', () => {
      const builder = new Fixture('firstName'.asConstant('Bob'));
      const fixture1 = builder.create() as User;
      const fixture2 = builder.create() as User;
      expect(fixture1).to.have.property('firstName', 'Bob');
      expect(fixture2).to.have.property('firstName', 'Bob');
    });
  });
  describe('asDate()', () =>{
    it('should return a date for the property', () => {
        const fixture = userFixture.create() as User;
        expect(fixture).to.have.property('date');
        expect(fixture.date).to.be.an.instanceof(Date);
    });
    it('should increment the date instances when specified', () => {
        const today = new Date();
        const builder = new Fixture('date'.asDate({incrementDay: true}));
        const f1 = builder.create() as {date: Date};
        const f2 = builder.create() as {date: Date};
        expect(f1.date.getDate()).to.be.equal(today.getDate());
        expect(f2.date.getDate()).to.be.equal(today.getDate()+1);

    });
  });
  describe('asNumber()', ()=> {
    const fb = new Fixture('id'.asNumber());
    const f1  = fb.create();
    const f2 = fb.create();
    expect(f1.id).to.equal(1);
    expect(f2.id).to.equal(2);
  });
  describe('asBoolean()', () =>{
    it('should create a boolean field', () => {
      const fb = new Fixture('flag'.asBoolean());
      const f = fb.create() as {flag: boolean};
      expect(f.flag).be.a('boolean');
    });
  });
  describe('asEmail()', () => {
    it('should populate field with an email address', () => {
      const fb = new Fixture('email'.asEmail());
      const f = fb.create();
      expect(f.email).to.equal('email1@example.com');
    });

  });
  describe('asArray', () =>{
    it('should create an array field on the fixture', () => {
      const builder = new Fixture('roles'.asArray());
      const f = builder.create() as {roles: Array<any>};
      expect(f.roles).to.be.an('array');
      expect(f.roles).to.eql(['roles1']);
    });
    it('should create an array with the specified length', () => {
      const builder = new Fixture('roles'.asArray(3));
      const f = builder.create() as {roles: Array<string>};
      expect(f.roles).to.have.lengthOf(3);
    });
  });
  describe('as()', ()=> {
    it('should create field using the function passed to it', () => {
        const builder = new Fixture('field'.as((inc) => `field${inc}`));
        const f = builder.create() as {field: string};
        expect(f.field).to.be.equal('field1');
    });
  });
  describe('pickFrom', () => {
    it('should pick from one of the provided values to populate the field', () => {
        const options = ['a', 'b', 'c', 'd'];
        const builder = new Fixture('prop'.pickFrom(options));
        const f = builder.create() as {prop: string};
        expect(options).to.include(f.prop);
    });
    it('should throw an error if options are not provided', () => {
      expect(() => new Fixture('prop'.pickFrom(null))).to.throw();
      expect(() => new Fixture('prop'.pickFrom([]))).to.throw();
    });
  });
  describe('fromFixture()', ()=> {
    it('creates a property based on the fixture', () => {
      const innerBuilder = new Fixture('a', 'b');
      const outerBuilder = new Fixture('c'.fromFixture(innerBuilder));
      const fixture = outerBuilder.create();
      expect(fixture).to.have.property('c');
      expect(fixture.c).to.eql({a: 'a1', b:'b1'});
    });
    it('uses overrides from the provided fixture', () => {
      const innerBuilder = new Fixture('a', 'b');
      const outerBuilder = new Fixture('c'.fromFixture(innerBuilder));
      const fixture = outerBuilder.create({c: { d: 'd1', e: 'e1' } });
      expect(fixture).to.have.property('c');
      expect(fixture.c).to.eql({d: 'd1', e:'e1'});
    });
  })
  describe('name generators', ()=>{
    it('should populate fields using the name generators', () => {
      const userGenerator = new Fixture(
        'firstName'.asFirstName(),
        'lastName'.asLastName(),
        'fullName'.asFullName()
      );
      const user = userGenerator.create() as {firstName: string, lastName: string, fullName: string};
      expect(user.firstName).to.be.a('string');
      expect(user.lastName).to.be.a('string');
      expect(user.fullName).to.be.a('string');
    });
  });
  describe('asLoremIpsum()', () => {
      it('should generate the lorem ipusm text', () =>{
        const builder = new Fixture('lorem'.asLoremIpsum());
        const f = builder.create() as {lorem: string};
        expect(f.lorem.length > 10).to.be.true;
      });
      it('should make text longer than the min', () => {
        const builder = new Fixture('lorem'.asLoremIpsum({minLength: 20, maxLength:50}));
        const f = builder.create() as {lorem: string};
        expect(f.lorem.length > 20).to.be.true;
        expect(f.lorem.length < 50).to.be.true;
      });
  })

});
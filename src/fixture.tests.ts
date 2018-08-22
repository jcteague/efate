import * as chai from 'chai';
const expect = chai.expect;
import PropertyBuilder from './property-builders';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';
chai.use(sinonChai);

import Fixture from "./fixture";
import {SinonStub} from "sinon";
interface User {
  firstName: string;
  lastName: string;
  email: string;
}

describe('fixture.specs', () => {
  let userFixture = new Fixture('firstName', 'lastName');
  let buildStub: SinonStub;
  beforeEach(()=> {

  });
  afterEach(() => {

  })

  it('should call the builders for all fixture fields', () => {
    buildStub = sinon.stub(PropertyBuilder, 'generateField' )
      .returns({name: 'prop', value: 'value'});
    const fixture = userFixture.create();
    expect(buildStub).to.be.calledTwice;
    buildStub.restore();
  });

  it('should add string properties to the fixture', () => {
    const fixture = userFixture.create();
    expect(fixture).to.have.property('firstName', 'firstName1');
    expect(fixture).to.have.property('lastName', 'lastName1');
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
  });

  describe('withValues()', ()=>{
    it('increments the specified value for the field value', () => {
        const fixture = new Fixture('email'.withValue('userEmail')).create() as User;
        expect(fixture.email).to.equal('userEmail1');
    });
  })

  describe('withConstant()', () =>{
    it('should create fields using a constant value that does not change between instances', () => {
      const builder = new Fixture('firstName'.withConstant('Bob'));
      const fixture1 = builder.create() as User;
      const fixture2 = builder.create() as User;
      expect(fixture1).to.have.property('firstName', 'Bob');
      expect(fixture2).to.have.property('firstName', 'Bob');
    });
  })

});
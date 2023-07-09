import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

import { defineFixture } from './fixture-factory';

const expect = chai.expect;

chai.use(sinonChai);

interface Account {
  userName: string;
  passWord: string;
}

interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  date: Date;
  roles: string[];
  account: Account;
}

describe('fixture.specs', () => {
  const accountFixture = defineFixture<Account>((a) => {
    a.userName.asString();
    a.passWord.asString();
  });

  const userFixture = defineFixture<User>((f) => {
    f.id?.asNumber();
    f.firstName.asString();
    f.lastName.asString();
    f.date.asDate();
    f.account.fromFixture(accountFixture);
    f.roles.asArray();
  });

  // let buildStub: SinonStub;

  // it('should call the builders for all fixture fields', () => {
  //   buildStub = sinon
  //     .stub(PropertyBuilder, 'generateField')
  //     .returns({ name: 'prop', value: 'value' });
  //   const fixture = userFixture.create();
  //   expect(buildStub).to.be.callCount(6);
  //   buildStub.restore();
  // });

  it('should add string properties to the fixture', () => {
    const fixture = userFixture.create();
    expect(fixture).to.have.property('firstName', 'firstName1');
    expect(fixture).to.have.property('lastName', 'lastName1');
    expect(fixture).to.have.property('date');
    expect(fixture).to.have.property('account');
    expect(fixture).to.have.property('roles');
    expect(fixture.roles).to.eql(['roles1']);
  });
  it('should omit fields from the fixture', () => {
    const fixture = userFixture.omit('id').create();
    expect(fixture).to.not.have.property('id');
  });
  it('should not create fields not included in the fixture definition', function () {
    const UserInputFixture = defineFixture<Omit<User, 'id'>>((f) => {
      f.firstName.asString();
      f.lastName.asString();
      f.date.asDate();
      f.account.fromFixture(accountFixture);
      f.roles.asArray();
    });
    const userInput = UserInputFixture.create();
    expect(userInput).to.not.have.property('id');
  });

  describe('overrides', () => {
    it('should let users override values for specific fields on the fixture', () => {
      const fixture = userFixture.create({ firstName: 'Joey' }) as User;
      expect(fixture.firstName).to.be.equal('Joey');
    });

    it('should allow users to use a function to override the fixture', () => {
      const fixture = userFixture.create((user: User) => (user.firstName = 'Joey')) as User;
      expect(fixture.firstName).to.be.equal('Joey');
    });
    it('should call create function once', () => {
      const builderFn = sinon.spy();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const fixture = userFixture.create(builderFn);
      expect(builderFn).to.be.calledOnce;
    });
    // not possible after typing the create function

    // it('can add new fields to the object through overrides', () => {
    //   const fixture = userFixture.create({ x: 1 }) as User;
    //   expect(fixture).to.have.property('id', 1);
    //   const f2 = userFixture.create(user => (user.id = 1));
    //   expect(f2).to.have.property('id', 1);
    // });
    it('can override nested objects', () => {
      const date = new Date(2022, 0, 1, 1, 0, 0);

      const fixture = userFixture.create({
        firstName: 'bob',
        date,
        account: { userName: 'user name overridden' } as Account,
      });

      expect(fixture).to.have.property('id');
      expect(fixture.date).to.equal(date);
      expect(fixture.account).to.exist;
      expect(fixture.account.passWord).to.contain('passWord');
      expect(fixture.account.userName).to.equal('user name overridden');
    });
  });

  describe('extends', () => {
    it('should included the fields it is being extended from', () => {
      interface Parent {
        a: string;
        b: string;
      }
      interface Child extends Parent {
        c: string;
      }
      const ParentFixture = defineFixture<Parent>((t) => {
        t.a.asString();
        t.b.asString();
      });
      const ChildFixture = defineFixture<Child>((t) => {
        t.extends(ParentFixture);
        t.c.asString();
      });
      const extendedObj = ChildFixture.create();
      expect(extendedObj).to.have.property('a');
      expect(extendedObj).to.have.property('b');
      expect(extendedObj).to.have.property('c');
    });
  });

  describe('create array of fixture', () => {
    it('should make an array of the object of the provided length', () => {
      const fixtures = userFixture.createArrayWith(5);
      expect(fixtures).to.have.lengthOf(5);
    });
    it('when a single override is provided, all entries should match', () => {
      const fixtures = userFixture.createArrayWith(3, { firstName: 'alpha' });
      fixtures.forEach((f) => expect(f.firstName).to.equal('alpha'));
    });
    it('when an array of overrides is passed, should create an array with the provided override array', () => {
      const fixtures = userFixture.createArrayWith(3, [
        { firstName: 'alpha' },
        { lastName: 'beta' },
      ]);
      expect(fixtures).to.have.lengthOf(3);
      expect(fixtures[0].firstName).to.eql('alpha');
      expect(fixtures[1].lastName).to.eql('beta');
    });
    it('when a function is passed, the function should be applied as directed', () => {
      const fixtures = userFixture.createArrayWith(3, (idx, create) => {
        if (idx === 0) {
          return create({ firstName: 'alpha' });
        } else {
          return create();
        }
      });
      expect(fixtures).lengthOf(3);
      expect(fixtures[0].firstName).to.eql('alpha');
    });

    describe('withValues()', () => {
      it('increments the specified value for the field value', () => {
        const fixture = defineFixture<User>((t) => t.email.withValue('userEmail')).create() as User;
        expect(fixture.email).to.equal('userEmail1');
      });
    });

    describe('asConstant()', () => {
      it('should create fields using a constant value that does not change between instances', () => {
        const builder = defineFixture<User>((t) => t.firstName.asConstant('Bob'));
        const fixture1 = builder.create() as User;
        const fixture2 = builder.create() as User;
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
        const builder = defineFixture<{ date: Date }>((t) => t.date.asDate({ incrementDay: true }));
        const f1 = builder.create();
        const f2 = builder.create();
        expect(f1.date.getDate()).to.be.equal(today.getDate());
        expect(f2.date.getDate()).to.be.equal(today.getDate() + 1);
      });
    });
    describe('asNumber()', () => {
      const fb = defineFixture<{ id: number }>((t) => t.id.asNumber());
      const f1 = fb.create();
      const f2 = fb.create();
      expect(f1.id).to.equal(1);
      expect(f2.id).to.equal(2);
    });
    describe('asBoolean()', () => {
      it('should create a boolean field', () => {
        const fb = defineFixture<{ flag: boolean }>((t) => t.flag.asBoolean());
        const f = fb.create();
        expect(f.flag).be.a('boolean');
      });
    });
    describe('asEmail()', () => {
      it('should populate field with an email address', () => {
        const fb = defineFixture<{ email: string }>((t) => t.email.asEmail());
        const f = fb.create();
        expect(f.email).to.equal('email1@example.com');
      });
    });
    describe('asArray', () => {
      it('should create an array field on the fixture', () => {
        const builder = defineFixture<{ roles: [] }>((t) => t.roles.asArray());
        const f = builder.create();
        expect(f.roles).to.be.an('array');
        expect(f.roles).to.eql(['roles1']);
      });
      it('should create an array with the specified length', () => {
        const builder = defineFixture<{ roles: [] }>((t) => t.roles.asArray({ length: 3 }));
        const f = builder.create() as { roles: string[] };
        expect(f.roles).to.have.lengthOf(3);
      });
      // it('should create an array of the specified type', () => {
      //   const builder = defineFixture<{roles: []}>(t =>
      //     t.roles.asArray({length: 3}));
      //
      //   const f = builder.create() as { roles: any[] };
      //   expect(f.roles).to.eql([1, 2, 3]);
      // });
    });

    describe('as()', () => {
      it('should create field using the function passed to it', () => {
        const builder = defineFixture<{ field: string }>((t) => t.field.as((inc) => `field${inc}`));
        const f = builder.create() as { field: string };
        expect(f.field).to.be.equal('field1');
      });
    });

    describe('pickFrom', () => {
      it('should pick from one of the provided values to populate the field', () => {
        const options = ['a', 'b', 'c', 'd'];
        const builder = defineFixture<{ prop: string }>((t) => t.prop.pickFrom(options));
        const f = builder.create();
        expect(options).to.include(f.prop);
      });
      it('should throw an error if options are not provided', () => {
        const f = defineFixture<{ prop: string }>((t) => t.prop.pickFrom([]));
        expect(() => f.create()).to.throw();
      });
    });
    describe('fromFixture()', () => {
      it('creates a property based on the fixture', () => {
        interface InnerObj {
          a: string;
          b: string;
        }

        const innerBuilder = defineFixture<InnerObj>((t) => {
          t.a.asString();
          t.b.asString();
        });
        const outerBuilder = defineFixture<{ c: InnerObj }>((t) => t.c.fromFixture(innerBuilder));
        const fixture = outerBuilder.create();
        expect(fixture).to.have.property('c');
        expect(fixture.c).to.eql({ a: 'a1', b: 'b1' });
      });
      it('uses overrides from the provided fixture', () => {
        interface InnerObj {
          a: string;
          b: string;
        }

        const innerBuilder = defineFixture<InnerObj>((t) => {
          t.a.asString();
          t.b.asString();
        });
        const outerBuilder = defineFixture<{ c: InnerObj }>((t) => t.c.fromFixture(innerBuilder));
        const fixture = outerBuilder.create({ c: { a: 'd1', b: 'e1' } });
        expect(fixture).to.have.property('c');
        expect(fixture.c).to.eql({ a: 'd1', b: 'e1' });
      });
    });
    describe('arrayOfFixture()', () => {
      it('creates an array of fixtures', () => {
        interface InnerObj {
          a: string;
          b: string;
        }

        const innerFixture = defineFixture<InnerObj>((t) => {
          t.a.asString();
          t.b.asString();
        });
        const outerFixture = defineFixture<{ c: InnerObj }>((t) =>
          t.c.arrayOfFixture({ fixture: innerFixture }),
        );
        const fixture = outerFixture.create();

        expect(fixture.c).to.be.an('array');
        expect(fixture.c).to.have.lengthOf(3);
        expect(fixture.c[0]).to.have.property('a');
      });
    });
    describe('name generators', () => {
      it('should populate fields using the name generators', () => {
        interface Names {
          firstName: string;
          lastName: string;
          fullName: string;
        }

        const userGenerator = defineFixture<Names>((t) => {
          t.firstName.firstName();
          t.lastName.lastName();
          t.fullName.fullName();
        });
        const user = userGenerator.create();
        expect(user.firstName).to.be.a('string');
        expect(user.lastName).to.be.a('string');
        expect(user.fullName).to.be.a('string');
      });
    });
    describe('asLoremIpsum()', () => {
      it('should generate the lorem ipusm text', () => {
        const builder = defineFixture<{ lorem: string }>((t) => t.lorem.asLoremIpsum());
        const f = builder.create() as { lorem: string };
        // console.log(f);
        expect(f.lorem.length > 10).to.be.true;
      });
      it('should make text longer than the min', () => {
        const builder = defineFixture<{ lorem: string }>((t) =>
          t.lorem.asLoremIpsum({ minLength: 20, maxLength: 50 }),
        );
        const f = builder.create() as { lorem: string };
        expect(f.lorem.length > 20, 'length less than min').to.be.true;
        expect(f.lorem.length < 50, 'length greater than max').to.be.true;
      });
    });
  });
});

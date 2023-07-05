# TOC

- [fixture.specs](#fixturespecs) - [overrides](#fixturespecs-overrides) - [withValues()](#fixturespecs-withvalues) - [asConstant()](#fixturespecs-asconstant) - [asDate()](#fixturespecs-asdate) - [asNumber()](#fixturespecs-asnumber) - [asBoolean()](#fixturespecs-asboolean) - [asEmail()](#fixturespecs-asemail) - [asArray](#fixturespecs-asarray) - [as()](#fixturespecs-as) - [pickFrom](#fixturespecs-pickfrom) - [fromFixture()](#fixturespecs-fromfixture) - [arrayOfFixture()](#fixturespecs-arrayoffixture) - [name generators](#fixturespecs-name-generators) - [asLoremIpsum()](#fixturespecs-asloremipsum)
  <a name=""></a>

<a name="fixturespecs"></a>

# fixture.specs

should call the builders for all fixture fields.

```js
buildStub = sinon
  .stub(property_builders_1.default, 'generateField')
  .returns({ name: 'prop', value: 'value' });
const fixture = userFixture.create();
expect(buildStub).to.be.callCount(3);
buildStub.restore();
```

should add string properties to the fixture.

```js
const fixture = userFixture.create();
expect(fixture).to.have.property('firstName', 'firstName2');
expect(fixture).to.have.property('lastName', 'lastName2');
```

<a name="fixturespecs-overrides"></a>

## overrides

should let users override values for specific fields on the fixture.

```js
const fixture = userFixture.create({ firstName: 'Joey' });
expect(fixture.firstName).to.be.equal('Joey');
```

should allow users to use a function to override the fixture.

```js
const fixture = userFixture.create((user) => (user.firstName = 'Joey'));
expect(fixture.firstName).to.be.equal('Joey');
```

should call create function once.

```js
const builderFn = sinon.spy();
const fixture = userFixture.create(builderFn);
expect(builderFn).to.be.calledOnce;
```

can add new fields to the object through overrides.

```js
const fixture = userFixture.create({ id: 1 });
expect(fixture).to.have.property('id', 1);
const f2 = userFixture.create((user) => (user.id = 1));
expect(f2).to.have.property('id', 1);
```

<a name="fixturespecs-withvalues"></a>

## withValues()

increments the specified value for the field value.

```js
const fixture = new fixture_1.default('email'.withValue('userEmail')).create();
expect(fixture.email).to.equal('userEmail1');
```

<a name="fixturespecs-asconstant"></a>

## asConstant()

should create fields using a constant value that does not change between instances.

```js
const builder = new fixture_1.default('firstName'.asConstant('Bob'));
const fixture1 = builder.create();
const fixture2 = builder.create();
expect(fixture1).to.have.property('firstName', 'Bob');
expect(fixture2).to.have.property('firstName', 'Bob');
```

<a name="fixturespecs-asdate"></a>

## asDate()

should return a date for the property.

```js
const fixture = userFixture.create();
expect(fixture).to.have.property('date');
expect(fixture.date).to.be.an.instanceof(Date);
```

should increment the date instances when specified.

```js
const today = new Date();
const builder = new fixture_1.default('date'.asDate({ incrementDay: true }));
const f1 = builder.create();
const f2 = builder.create();
expect(f1.date.getDate()).to.be.equal(today.getDate());
expect(f2.date.getDate()).to.be.equal(today.getDate() + 1);
```

<a name="fixturespecs-asboolean"></a>

## asBoolean()

should create a boolean field.

```js
const fb = new fixture_1.default('flag'.asBoolean());
const f = fb.create();
expect(f.flag).be.a('boolean');
```

<a name="fixturespecs-asemail"></a>

## asEmail()

should populate field with an email address.

```js
const fb = new fixture_1.default('email'.asEmail());
const f = fb.create();
expect(f.email).to.equal('email1@example.com');
```

<a name="fixturespecs-asarray"></a>

## asArray

should create an array field on the fixture.

```js
const builder = new fixture_1.default('roles'.asArray());
const f = builder.create();
expect(f.roles).to.be.an('array');
expect(f.roles).to.eql(['roles1']);
```

should create an array with the specified length.

```js
const builder = new fixture_1.default('roles'.asArray({ length: 3 }));
const f = builder.create();
expect(f.roles).to.have.lengthOf(3);
```

should create an array of the specified type.

```js
const builder = new fixture_1.default(
  'roles'.asArray({
    length: 3,
    builder: index_1.propertyBuilders.asNumberBuilder,
  }),
);
const f = builder.create();
expect(f.roles).to.eql([1, 2, 3]);
```

<a name="fixturespecs-as"></a>

## as()

should create field using the function passed to it.

```js
const builder = new fixture_1.default('field'.as((inc) => `field${inc}`));
const f = builder.create();
expect(f.field).to.be.equal('field1');
```

<a name="fixturespecs-pickfrom"></a>

## pickFrom

should pick from one of the provided values to populate the field.

```js
const options = ['a', 'b', 'c', 'd'];
const builder = new fixture_1.default('prop'.pickFrom(options));
const f = builder.create();
expect(options).to.include(f.prop);
```

should throw an error if options are not provided.

```js
expect(() => new fixture_1.default('prop'.pickFrom([]))).to.throw();
```

<a name="fixturespecs-fromfixture"></a>

## fromFixture()

creates a property based on the fixture.

```js
const innerBuilder = new fixture_1.default('a', 'b');
const outerBuilder = new fixture_1.default('c'.fromFixture(innerBuilder));
const fixture = outerBuilder.create();
expect(fixture).to.have.property('c');
expect(fixture.c).to.eql({ a: 'a1', b: 'b1' });
```

uses overrides from the provided fixture.

```js
const innerBuilder = new fixture_1.default('a', 'b');
const outerBuilder = new fixture_1.default('c'.fromFixture(innerBuilder));
const fixture = outerBuilder.create({ c: { d: 'd1', e: 'e1' } });
expect(fixture).to.have.property('c');
expect(fixture.c).to.eql({ d: 'd1', e: 'e1' });
```

<a name="fixturespecs-arrayoffixture"></a>

## arrayOfFixture()

creates an array of fixtures.

```js
const innerFixture = new fixture_1.default('a', 'b');
const outerFixture = new fixture_1.default('c'.arrayOfFixture(innerFixture));
const fixture = outerFixture.create();
expect(fixture.c).to.be.an('array');
expect(fixture.c).to.have.lengthOf(3);
expect(fixture.c[0]).to.have.property('a');
```

<a name="fixturespecs-name-generators"></a>

## name generators

should populate fields using the name generators.

```js
const userGenerator = new fixture_1.default(
  'firstName'.asFirstName(),
  'lastName'.asLastName(),
  'fullName'.asFullName(),
);
const user = userGenerator.create();
expect(user.firstName).to.be.a('string');
expect(user.lastName).to.be.a('string');
expect(user.fullName).to.be.a('string');
```

<a name="fixturespecs-asloremipsum"></a>

## asLoremIpsum()

should generate the lorem ipusm text.

```js
const builder = new fixture_1.default('lorem'.asLoremIpsum());
const f = builder.create();
expect(f.lorem.length > 10).to.be.true;
```

should make text longer than the min.

```js
const builder = new fixture_1.default('lorem'.asLoremIpsum({ minLength: 20, maxLength: 50 }));
const f = builder.create();
expect(f.lorem.length > 20).to.be.true;
expect(f.lorem.length < 50).to.be.true;
```

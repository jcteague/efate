## Efate
A Test Fixture Builder
![Image of Efate](https://www.shoreexcursionsgroup.com/img/tour/SPPVEFATE-2.jpg)

Efate of the next version of [autofixture.js](https://github.com/jcteague/autofixturejs).  There were 
so many changes to make that a rewrite was in order.  It has the same basic usage, plus:
* Has a modular design to make it more intuitive to use (no more string matching to find the right builder)
* Extensible.  You can add your own type builders

### Creating a fixture
You create a fixture in much of the same way as autofixture does, create the fixture and define the fields to be generated

```javascript
const UserFixture = new Fixture('firstName', 'lastName');
```
When you create a this fixture it will create an object that has the `firstName` and `lastName` fields with string values.

### Using a fixture
```javascript
// generatate a fixture with system generated values
const user = UserFixture.create();
// {firstName: 'firstName1', lastName: 'lastName1'
```
As you create more fixtures, the values will vary by incrementing the number for each field
```javascript
// generatate a fixture with system generated values
const user = UserFixture.create();
// {firstName: 'firstName1', lastName: 'lastName1'
const user = UserFixture.create();
// {firstName: 'firstName2', lastName: 'lastName2'
```
You can override specific fields of the test fixture to test specific cases in your tests and still have complete objects

```javascript
const user = UserFixture.create({firstName: 'George', lastName: 'Washington'});
// {firstName: 'George', lastName: 'Washington'}
```
If you need to make more complicated changes to the fixture, you can pass a function

```javascript
const user = UserFixture.create((user) => {
    // make changes to the user fixture then return back the user
    user.firstName = 'George';
    return user;
});
// {firstName: 'firstName1', lastName: 'lastName1'
```

### Specifying field types and special values
The default type for generated fields will be a String.  There are many prebuilt type builders to specify what the builder should create

```javascript
const UserFixture = new Fixture(
  'firstName',
  'lastName',
  'dateOfBirth'.asDate()
);
// {firstName: 'George', lastName: 'Washington', dateOf}
```
### Provided Type Generators
All of the type generators behavior is describe in the generated [Spec file](packages/efate/spec.md).
* **withValues()** uses specified text to generate values
    ```javascript
    new Fixture('foo'.withValue('bar'))
    // {foo: 'bar1'}```
  
* **asConstant()** does not increment the value of the field for all fixtures

* **as((increment)=> val)** custom function to generate values. The `increment` parameter is the count of usages of the fixture
    ```javascript
    new Fixture('email'.as(increment => `email${increment}@company.com`);
    // {email: 'email1@company.com'}```
  
* **asNumber()** generates auto incrementing number values for the field

* **asDate({incrementDay: boolean})** generates a date value for the field.  If `incrementDay` is true the day will increment for each fixture created.  Otherwise the same date is used for all fixtures.
* **asBoolean()** generates a boolean value for the field
* **asArray(length = 1)** generates an array for the field.  The `length` parameter specifies length of the array, defaulted to 1
    ```javascript
    new Fixture('roles'.asArray());
    // {roles: ['roles1']
    ```
  
* **pickFrom([possible values])** randomly picks one of the possible values provided to set the field value. 
    ```javascript
    new Fixture('role'.pickFrom(['user', 'admin']))
    // {role: 'user'|'admin'}
    ```
  
* **fromFixture(Fixture)** When you need to nest an object created from another fixture
    ```javascript
    const UserFixture = new Fixture('username', 'email');
    const OrderFixture = new Fixture(
      'orderId'.asNumber(),
      'customer'.fromFixture(UserFixture)
  );
  // {orderId: 1, customer: {username: 'username1', email: 'email1'}}```

* **arrayOfFixture(Fixture, length = 3)** generates and array of object created from the fixture passed in.

* **asEmail()** creates an email address `email1@example.com`
* **asFirstName()** uses value from list of possible names to create more realistic data
* **asLastName()** uses value from list of possible names to create more realistic data
* **asFullName()** combines first name and last name values
* **asLoremIpsum({minLength: 10,  maxLength: 25})** generates ispsum lorem text for generating longer text.  Useful when using this tool for seed data.

## Extending Efate with your own type builder
You can extend the efate with your own custom type builder.  An example is the [efate-uuid](/packages/efate-uuid) builder that creates valid UUID values

### Create the builder.
A builder is a function that takes input parameter at time of definition and returns a function that is used to create
the value at the time of creation.  This function returns the [Field](/packages/efate/src/field.ts) object.  The function will be attached to the String prototype, which is how you know what the field name is.

**Example builder Function**
```javascript
const asCustomDomainEmailbuilder = function(domainName = 'example.com'): BuilderReturnFunction {
  const fieldName = this; // since we're attached to the String protoType, the field name is the this object. 
  return (increment) => {
    return new Field(fieldName, `email${increment}@example.com`);
  };
};
```
Once you've defined your builder, you attach it to the String prototype with the name of the function 
you want to use when define the fixture.

```javascript
attachBuilderToStringProto('asCustomDomainEmail', asEmailbuilder);
```
It can now be used to when you define a new Fixture.

```javascript
const MyFixture = new Fixture('email'.asCustomDomainEmail('mydomain.com'));
```



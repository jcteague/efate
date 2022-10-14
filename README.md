## Efate
**A Test Fixture Builder**
![Image of Efate](https://www.shoreexcursionsgroup.com/img/tour/SPPVEFATE-2.jpg)
- [Efate](#efate)
  - [Why use a fixture builder](#why-use-a-fixture-builder)
- [Installation](#installation)
- [Usage](#usage)
  - [Defining the Fixure](#defining-the-fixure)
  - [Creating test objects](#creating-test-objects)
  - [Creating Arrays of Fixtures](#creating-arrays-of-fixtures)
  - [Specifying field types and special values](#specifying-field-types-and-special-values)
  - [Extending Fixtures](#extending-fixtures)
  - [Provided Type Generators](#provided-type-generators)
- [Debugging](#debugging)
- [Extensions](#extensions)
  - [Using an extension](#using-an-extension)
- [Extending Efate with your own type builder](#extending-efate-with-your-own-type-builder)
  - [Creating the interface](#creating-the-interface)
  - [Create the builder](#create-the-builder)
### Why use a fixture builder
If you have a moderate to large web app and are using JSON files to store your test fixtures, a test fixture library can solve several issues you may be experiencing.
#### Test Fixture Change Transference
When you load the json file into a test file, you have a single instance of that test data for all of the tests in that file.  If you need to change a field in your test data, all subsequent tests will run with that changed value.  This can lead to confusing test failures.
#### Inconsistent Test Data
Sometimes, when you need to vary the data for a test, it's tempting to create a new object with the information needed just for that single test.  This leads to a proliferation of unstructured test data that can be difficult and time consuming to update when data structures change.
#### 
## Installation

```
npm install efate 
```
Install any extensions you want to use, two are currently available from this repo:
- [efate-uuid](https://github.com/jcteague/efate/tree/master/packages/efate-uuid)
- [efate-faker](https://github.com/jcteague/efate/tree/master/packages/efate-faker)

## Usage
efate provides a typesafe way to define and create your fixtures. You can create the fixtures for each test, each with unique but understandable values.  You can also set specific values of fields of interest for the current test.

There are two phase to fixture usage:
1. Fixture definition
2. Object creation

### Defining the Fixure
Import `defineFixture` to create a standard fixture (without any extensions).

```typescript
import {defineFixture} from "efate";
```
Using this function, you can define what fields should be populated and how.

```typescript
const userFixture = define<User>(t => {
  t.id.asNumber();  // id field will be numberical value that increments as you create user objects
  t.firstName.asString(); 
  t.lastName.asString();
})

export {userFixture};
```
### Creating test objects

Import the test fixture into your file and create the mock object, overriding any values that you need to for the test.

```javascript
import {userFixture} from '<your fixtures>';
// generatate a fixture with system generated values
const user = userFixture.create();
// {id: 1, firstName: 'firstName1', lastName: 'lastName1'}
```
As you create more fixtures, the values will vary by incrementing the number for each field
```typescript
// generatate a fixture with system generated values
const user = userFixture.create();
// {id: 1, firstName: 'firstName1', lastName: 'lastName1'
const user = userFixture.create();
// {id: 2, firstName: 'firstName2', lastName: 'lastName2'
```
You can override specific fields of the test fixture to test specific cases in your tests and still have complete objects

```typescript
const user = userFixture.create({firstName: 'George', lastName: 'Washington'});
// {firstName: 'George', lastName: 'Washington'}
```
If you need to make more complicated changes to the fixture, you can pass a function

```javascript
const user = UserFixture.create((user) => {
    // make changes to the user fixture then return back the user
    user.firstName = 'George';
});
// {firstName: 'George', lastName: 'lastName1'
```
### Creating Arrays of Fixtures
You can generate an array of fixtures by using the `UserFixture.createArrayWith`. The function accepts an override parameter that will either:
* single `Partial` of the object that will override all objects in the array
* a subset array that will override the matching index in the return array
* a function that allows you to determine how the array will be overridden
* no value and all arrays are created with default values

**Override All elements**
```typescript
const users = UserFixture.createArrayWith(2, {firstName: 'George'});
[
    {firstName:'George', lastName: 'lastName1', ...}, 
    {firstName:'George', lastName: 'lastName2', ...}
]
```
**Override just the first element**
```typescript
const users = UserFixture.createArrayWith(2, [{firstName: 'George'}]);
[
    {firstName:'George', lastName: 'lastName1', ...}, 
    {firstName:'George', lastName: 'lastName2', ...}
]
```
**Override with a function**
```typescript
const users = UserFixture.createArrayWith(2, (idx, create) => {
if (idx === 0){
  return create({firstName: 'George'});
} else {
  return create();
}
});
// results
[
  {firstName:'George', lastName: 'lastName1', ...},
  {firstName:'firstName2', lastName: 'lastName2', ...}
]
```


### Specifying field types and special values
The function passed to the `createFixture` allows you to determine how each field will be generated when you create a new fixture

The type specified will be user as the return type when you `create` the fixture.

These two features together allow for the type-safe creation of fixtures, plus great auto-complete in your editor.
```typescript
const userFixture = createFixture<User>(t => {
  t.firstName.asString();
  t.lastName.asString();
  t.dateOfBirth.asDate();
})
```
### Extending Fixtures
If you have a type that extends another type, or you have a common set of fields used in multiple objects, you can extend a fixture so you can reuse an existing fixture definition to add fields to another fixture.

```typescript
import {defineFixture} from "efate";

interface User {
  name: string;
}

interface LoggedInUser extends User {
  lastLoginDate: Date
}

const UserFixture = defineFixture<User>(t => {
  t.name.asString();
})
//use UserFixture to add fields to LoggedInuser fixture
const LoggedInUserFixture = defineFixture<LoggedInUser>(t =>{
  t.extend(UserFixture);
  t.lastLoginDate.asDate();
})

```

### Provided Type Generators
All of the type generators behavior is described in the generated [Spec file](packages/efate/spec.md).
* **withValues()** 
 uses specified text to generate values
  ```typescript
  const userFixture = createFixture<{foo:string}>(t => {
    t.foo.withValue('bar')
  });
  const user = userFixture.create();
  // {foo: 'bar1'}
  ```

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
    const fixture = createFixture<{role:string[]}>(t => {
      t.role.asArray()
    })
    // {roles: ['roles1']}
    ```

* **pickFrom([possible values])** randomly picks one of the possible values provided to set the field value.
    ```javascript
    const fixture = createFixture<{role:string[]}>(t => {
      t.role.pickFrom(['user', 'admin'])
    })

    //will generate {role: 'user'|'admin'}
    ```

  * **fromFixture(Fixture)** When you need to nest an object created from another fixture
      ```javascript
    const userFixture = createFixture<User>(t => {
      ...   
    });
    const OrderFixture = createFixture<Order>(t => {
        t.orderId.asNumber();
        t.customer.fromFixture(UserFixture)
    );
    // {orderId: 1, customer: {username: 'username1', email: 'email1'}}```

* **arrayOfFixture(Fixture, length = 3)** generates and array of object created from the fixture passed in.

* **asEmail()** creates an email address `email1@example.com`
* **asFirstName()** uses value from list of possible names to create more realistic data
* **asLastName()** uses value from list of possible names to create more realistic data
* **asFullName()** combines first name and last name values
* **asLoremIpsum({minLength: 10,  maxLength: 25})** generates ispsum lorem text for generating longer text.  Useful when using this tool for seed data.
## Debugging
If you have any trouble with how your fixtures are being generated, efate uses the [Debug](https://github.com/debug-js/debug) library.  You can turn on debug statements with the following environment variable
```
DEBUG=efate:
```
## Extensions
There are several extensions available to use with efate that expand the library with new field definitions.
- efate-uuid: creates unique identifiers using
- efate-faker: use the faker library to generate field values

### Using an extension
To use an extension, you must use the `defineFixtureFactory` method to include any of the extension you plan to use as part of the `defineFixture` function.
Extensions have two parts:
1. An interface that describes usage
2. A function that handles the implementation for the extension

These are passed to the `defineFixture` function; the interface as a type parameter and the function as a function parameter.
```typescript
import {defineFixtureFactory} from 'efate';
import {UUIDExtension, uuidExtension} from 'efate-uuid';

const defineFixture = defineFixtureFactory<UUIDExtension>(uuidExtension)

const userFixture = defineFixture(t => {
  t.id.asUUID();
})

```
## Extending Efate with your own type builder
You can extend the efate with your own custom type builder.  An example is the [efate-uuid](/packages/efate-uuid) builder that creates valid UUID values

There are 2 parts to extending efate:
1) Define an interface that describes value definition
2) Create a function that will be used during fixture creation

### Creating the interface
When you call `createFixtureFactory`, you can pass an interface as generic parameter to the function that will attach your extension to the object fields when defining a fixture.  This interface takes the form of:
```typescript
interface CustomDomainEmail {
  asCustomDomainEmail(domainName: string): void
}
```

### Create the builder
You pass an object to `createFixtureFactory` that has a fieldName that matches the name of the interface
that returns a curried function with the following signature, `fieldName: string, options: ?`
```typescript
{
  asCustomDomainEmail: (fieldName: string, domainName: string) => (increment: number) => Field;
}
```
**Example builder Function**
```Typescript
const customDomainEmailExtension = {
  asCustomDomainEmail: (fieldName: string, domainName: string = 'example.com') =>
          (increment: number) =>  return new Field(fieldName, `email${increment}@${domainName}`);
}
```
You then call the factory method with this interface and object
```typescript
const createFixture = createFixtureFactory<CustomDomainEmail>(customDomainEmailExtension);
```
If you have multiple extensions, union the interfaces and pass botth object to the factory.
```typescript
const createFixture = createFixtureFactory<CustomDomainEmail & AnotherExtention>(customDomainEmailExtension, otherExtension);
```
These extensions will now be available when you define your fixtures. 



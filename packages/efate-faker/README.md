# `efate-faker`
## Use the faker library to populate property values



## Usage
Install the extension and pass the interface and function to `createFixtureFactory`
```typescript
import {createFixtureFactory} from 'efate'
import {FakerExtension, fakerExtension} from 'efate-faker';
const createFixture = createFixtureFactory<FakerExtension>(fakerExtension);
```
This exposes a `faker()` function that accepts a function as parameter to specify which faker methods you want to use.  The `incremement` value is also passed to the callback function if you want to use it.

```typescript
interface User {
  firstName: string
  userName: string
}
const userFixture = createFixture<User>(t => {
  t.firstName.faker((faker, increment) => faker.name.firstName());
  t.userName.faker((faker, increment) => faker.internet.userName());
});
```
## Todo
This is the first pass at the this extension and really was the quickest way to implement it.  It would be nice not to have to relay on the callback function.  Also, currently the `Faker` object doesn't accept the option parameters, so its behavior can't be modified yet.

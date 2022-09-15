import * as chai from 'chai';
const expect = chai.expect;
import { FakerExtension, fakerExtension } from './index';
import { defineFixtureFactory, Field } from 'efate';
interface User {
  name: string;
  title: string;
}
describe('efate-faker', () => {
  const defineFixture = defineFixtureFactory<FakerExtension>(fakerExtension);
  const userFixture = defineFixture<User>((t) => {
    t.name.faker((f) => f.name.firstName());
    t.title.faker((f, increment) => `${f.name.jobTitle()}${increment}`);
  });
  it('should use the faker function to return a value', function () {
    const user = userFixture.create();
    expect(user.name).to.be.a('string');
  });
  it('faker function should have access to the incremented value', function () {
    const user = userFixture.create();
    const increment = Number(user.title[user.title.length - 1]);

    expect(increment).to.be.a('number');
  });
});

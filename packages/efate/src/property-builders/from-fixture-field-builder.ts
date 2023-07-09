import Field from '../field';
import Fixture from '../index';

const fromFixtureBuilder =
  <T>(fieldName: string, [fixture]: [Fixture<T>]) =>
  () =>
    new Field(fieldName, fixture.create());

export default fromFixtureBuilder;

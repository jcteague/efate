import Field from '../field';
import Fixture from '../index';
export interface ArrayOfFixtureBuilderOptions<T> {
  fixture: Fixture<T>;
  count?: number;
}
const arrayOfFixtureBuilder =
  <T>(fieldName: string, [{ fixture, count }]: Array<ArrayOfFixtureBuilderOptions<T>>) =>
  (increment: number) => {
    const arrayCount = count ?? 3;
    const mocks = [...new Array(arrayCount).keys()].map(() => fixture.create());
    return new Field(fieldName, mocks);
  };

export default arrayOfFixtureBuilder;

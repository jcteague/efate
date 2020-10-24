import Field from '../field';
import Fixture from '../index';
import { BuilderReturnFunction } from '../types';
import { attachBuilderToStringProto } from '../utils';

const arrayOfFixtureBuilder = function(
  this: string,
  fixture: Fixture,
  count: number = 3
): BuilderReturnFunction {
  const fieldName = this;
  const createArray = () =>
    [...new Array(count).keys()].map(() => fixture.create());
  return () => new Field(fieldName, createArray());
};

attachBuilderToStringProto('arrayOfFixture', arrayOfFixtureBuilder);
export default arrayOfFixtureBuilder;

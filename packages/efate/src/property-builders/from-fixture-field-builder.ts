import Field from '../field';
import Fixture from '../index';
import { BuilderReturnFunction, DateBuilderOptions } from '../types';
import { attachBuilderToStringProto } from '../utils';

const fromFixtureBuilder = function(
  this: string,
  fixture: Fixture
): BuilderReturnFunction {
  const fieldName = this;
  return () => {
    return new Field(fieldName, fixture.create());
  };
};

attachBuilderToStringProto('fromFixture', fromFixtureBuilder);
export default fromFixtureBuilder;

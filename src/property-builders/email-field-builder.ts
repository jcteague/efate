import Field from '../field';
import { BuilderReturnFunction, DateBuilderOptions } from '../types';
import { attachBuilderToStringProto } from '../utils';

const asEmailbuilder = function(this: string): BuilderReturnFunction {
  const fieldName = this;
  return (increment: number) => {
    return new Field(fieldName, `email${increment}@example.com`);
  };
};

attachBuilderToStringProto('asEmail', asEmailbuilder);

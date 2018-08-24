import Field from '../field';
import { BuilderReturnFunction, DateBuilderOptions } from '../types';
import { attachBuilderToStringProto } from '../utils';

const asBooleanBuilder = function(this: string): BuilderReturnFunction {
  const fieldName = this;
  return () => {
    return new Field(fieldName, !!Math.floor(Math.random() * 2));
  };
};

attachBuilderToStringProto('asBoolean', asBooleanBuilder);

import Field from '../field';
import { BuilderReturnFunction, DateBuilderOptions } from '../types';
import { attachBuilderToStringProto } from '../utils';
import asArrayBuilder from "./array-field-builder";

const asBooleanBuilder = function(this: string): BuilderReturnFunction {
  const fieldName = this;
  return () => {
    return new Field(fieldName, !!Math.floor(Math.random() * 2));
  };
};

attachBuilderToStringProto('asBoolean', asBooleanBuilder);
export default asBooleanBuilder;
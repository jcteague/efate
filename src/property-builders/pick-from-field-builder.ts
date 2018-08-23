import {BuilderReturnFunction, DateBuilderOptions} from "../types";
import Field from "../field";
import {attachBuilderToStringProto} from "../utils";

const pickFromBuilder = function(this:string, options: Array<any>): BuilderReturnFunction {
  if (!options || options.length === 0) {
    throw new Error('options to pick values from not provided');
  }
  const fieldName = this;
  return () => {
    return new Field(fieldName, options[Math.floor(Math.random()*options.length)]);
  }
};

attachBuilderToStringProto('pickFrom', pickFromBuilder);
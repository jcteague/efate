import {BuilderReturnFunction, DateBuilderOptions} from "../types";
import Field from "../field";
import {attachBuilderToStringProto} from "../utils";

const buildFromFunction = function(this:string, func: (increment: number) => any): BuilderReturnFunction {
  const fieldName = this;
  return (increment: number) => {
    return new Field(fieldName, func(increment));
  }
};

attachBuilderToStringProto('as', buildFromFunction);
import {BuilderReturnFunction, DateBuilderOptions} from "../types";
import Field from "../field";
import {attachBuilderToStringProto} from "../utils";

const asArrayBuilder = function(this:string, length: number = 1): BuilderReturnFunction {
  const fieldName = this;
  const createArray = (prefix: string, len: number) => {
    const arr: Array<string> = [];
    for (let i = 1; i < len + 1; i++) {
      arr.push(`${prefix}${i}`);
    }
    return arr;
  };
  return () => {
    return new Field(fieldName, createArray(fieldName, length));
  }
};

attachBuilderToStringProto('asArray', asArrayBuilder);
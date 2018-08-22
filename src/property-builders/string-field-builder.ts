import {FieldBuilder} from "../types";
import Field from '../field';
import {attachBuilderToStringProto} from '../utils'

interface BuilderReturnFunction {
  (this: string, increment: number): Field;
}

const withValueBuilder = function (this: string, valuePrefix: string): BuilderReturnFunction {
  const fieldName = this;
  return (increment: number) => new Field(fieldName, `${valuePrefix}${increment}`);
};
const withConstantBuilder = function(this: string, valueConstant: any): BuilderReturnFunction {
  const fieldName = this;
  console.log(fieldName);
  return () => new Field(fieldName, valueConstant);
};

attachBuilderToStringProto('withValue', withValueBuilder);
attachBuilderToStringProto('withConstant', withConstantBuilder);

// export const withValueBuilder;
export default {
  buildFixtureProperty(name: string, increment: number): Field {
    return new Field(name, `${name}${increment}`);
  }
}
import Field from "../field";
import {BuilderReturnFunction, FieldBuilder} from "../types";
import {attachBuilderToStringProto} from "../utils";
import {firstNames, lastNames} from "./names";

const withValueBuilder = function(this: string, valuePrefix: string): BuilderReturnFunction {
  const fieldName = this;
  return (increment: number) => new Field(fieldName, `${valuePrefix}${increment}`);
};
const withConstantBuilder = function(this: string, valueConstant: any): BuilderReturnFunction {
  const fieldName = this;
  return () => new Field(fieldName, valueConstant);
};

const getRandomElement = (list: any[]) => {
  const i = Math.floor(Math.random() * list.length);
  return list[i];
};

const firstNameBuilder = function(this: string): BuilderReturnFunction {
  const fieldName = this;
  return () => {
    return new Field(fieldName, getRandomElement(firstNames));
  };
};

const lastNameBuilder = function(this: string): BuilderReturnFunction {
  const fieldName = this;
  return () => {
    return new Field(fieldName, getRandomElement(lastNames));
  };
};

const fullNameBuilder = function(this: string): BuilderReturnFunction {
  const fieldName = this;
  return () => {
    const first = getRandomElement(firstNames);
    const last = getRandomElement(lastNames);
    return new Field(fieldName, `${first} ${last}`);
  };
};

attachBuilderToStringProto("withValue", withValueBuilder);
attachBuilderToStringProto("asConstant", withConstantBuilder);
attachBuilderToStringProto("asFirstName", firstNameBuilder);
attachBuilderToStringProto("asLastName", lastNameBuilder);
attachBuilderToStringProto("asFullName", fullNameBuilder);

// export const withValueBuilder;
export default {
  buildFixtureProperty(name: string, increment: number): Field {
    return new Field(name, `${name}${increment}`);
  },
};

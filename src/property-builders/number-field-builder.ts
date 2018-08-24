import Field from "../field";
import {BuilderReturnFunction, DateBuilderOptions} from "../types";
import {attachBuilderToStringProto} from "../utils";

const asNumberBuilder = function(this: string): BuilderReturnFunction {
  const fieldName = this;
  return (increment: number) => {
    return new Field(fieldName, increment);
  };
};

attachBuilderToStringProto("asNumber", asNumberBuilder);

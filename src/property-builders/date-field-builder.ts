import {BuilderReturnFunction, DateBuilderOptions} from "../types";
import Field from "../field";
import {attachBuilderToStringProto} from "../utils";
const defaultOptions = {
  incrementDay: false
} as DateBuilderOptions;
const asDateBuilder = function(this:string, options: DateBuilderOptions = defaultOptions): BuilderReturnFunction {
  const fieldName = this;
  return (increment: number) => {
    const date = new Date();
    if (options.incrementDay) {
      date.setDate(date.getDate()+(increment-1));
    }
    return new Field(fieldName, date);
  }
};

attachBuilderToStringProto('asDate', asDateBuilder);
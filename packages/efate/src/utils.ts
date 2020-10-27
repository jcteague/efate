// import Field from "./field";
import {BuilderReturnFunction} from "./types";
import Field from "./field";

export function createBuilder<T> (functionName: string, builderFn: (increment: number) => T)
:() => BuilderReturnFunction
  {
  // tslint:disable-next-line:only-arrow-functions
    const builder = function(this: string): BuilderReturnFunction {
      const fieldName = this;
      return (increment) => new Field(fieldName, builderFn(increment));
    }
    Object.defineProperty(String.prototype, functionName, {value: builder});
    return builder;
}


export const attachBuilderToStringProto = (name: string, value: Function) => {
  Object.defineProperty(String.prototype, name, { value });
};

const isOfType = <T>(type: string) => (value: any): value is T =>
  typeof value === type;
export const isObject = isOfType<object>('object');
export const isFunction = isOfType<Function>('function'); // tslint:disable-line
export const isString = isOfType<string>('string');
export default {};

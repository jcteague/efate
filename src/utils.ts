// import Field from "./field";

export const attachBuilderToStringProto = (name: string, value: Function) => {
  Object.defineProperty(String.prototype, name, {value} );
};

const isOfType = <T>(type: string) => (value: any): value is T => typeof value === type;
export const isObject = isOfType<Object>('object');
export const isFunction = isOfType<Function>('function');
export const isString = isOfType<string>('string');
export default {};
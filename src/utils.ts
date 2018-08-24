// import Field from "./field";

export const attachBuilderToStringProto = (name: string, value: () => void) => {
  Object.defineProperty(String.prototype, name, { value });
};

const isOfType = <T>(type: string) => (value: any): value is T =>
  typeof value === type;
export const isObject = isOfType<object>('object');
export const isFunction = isOfType<Function>('function'); // tslint:disable-line
export const isString = isOfType<string>('string');
export default {};

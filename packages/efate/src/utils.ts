const isOfType =
  <T>(type: string) =>
  (value: any): value is T =>
    typeof value === type;

export const isFunction = isOfType<Function>('function');
export const isObject = isOfType<object>('object');
export const isString = isOfType<string>('string');

const isOfType =
  <T>(type: string) =>
  (value: any): value is T =>
    typeof value === type;

export const isObject = isOfType<object>('object');
export const isFunction = isOfType<Function>('function');
export const isString = isOfType<string>('string');

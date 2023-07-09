const isOfType =
  <T>(type: string) =>
  (value: unknown): value is T =>
    typeof value === type;

export const isObject = isOfType<object>('object');
export const isFunction = isOfType<(...args: never[]) => void>('function');
export const isString = isOfType<string>('string');

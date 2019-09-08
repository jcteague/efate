import Field from './field';

// export type FieldBuilder = (increment: number) => BuilderReturnFunction;
export interface DateBuilderOptions {
  incrementDay: boolean;
}
export interface ArrayBuilderOptions {
  length?: number,
  builder?: () => BuilderReturnFunction,
}
export type BuilderReturnFunction = (increment: number) => Field;

export interface LoremIpsumOptions {
  minLength: number;
  maxLength: number;
}

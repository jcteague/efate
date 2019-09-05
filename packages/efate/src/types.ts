import Field from './field';

// export type FieldBuilder = (increment: number) => BuilderReturnFunction;
export interface DateBuilderOptions {
  incrementDay: boolean;
}
export type BuilderReturnFunction = (increment: number) => Field;

export interface LoremIpsumOptions {
  minLength: number;
  maxLength: number;
}

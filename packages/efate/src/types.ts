import Field from './field';

// export type FieldBuilder = (increment: number) => BuilderReturnFunction;
export interface DateBuilderOptions {
  incrementDay: boolean;
}

export type BuilderReturnFunction<T> = (increment: number) => Field<T>;

export interface LoremIpsumOptions {
  minLength: number;
  maxLength: number;
}

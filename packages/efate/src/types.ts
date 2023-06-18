import Field from './field';

export type BuilderGeneratorFunction<T> = (increment: number) => Field<keyof T>;
export type BuilderReturnFunction<T> = (increment: number) => Field<T>;

export type DateBuilderOptions = {
  incrementDay: boolean;
};

export type LoremIpsumOptions = {
  minLength: number;
  maxLength: number;
};

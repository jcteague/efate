import Field from './field';

// export type FieldBuilder = (increment: number) => BuilderReturnFunction;
export type DateBuilderOptions = Partial<{
  incrementDay: boolean;
  formatter: (date: Date) => any;
}>
export type FieldGeneratorFunc = (increment: number) => Field<any>;
export type BuilderReturnFunction<T> = (increment: number) => Field<T>;

export interface LoremIpsumOptions {
  minLength: number;
  maxLength: number;
}

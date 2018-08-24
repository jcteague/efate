import Field from './field';

export interface FieldBuilder {
  buildFixtureProperty(increment: number);
}
export interface DateBuilderOptions {
  incrementDay: boolean;
}
export type BuilderReturnFunction = (increment: number) => Field;

export interface LoremIpsumOptions {
  minLength: number;
  maxLength: number;
}

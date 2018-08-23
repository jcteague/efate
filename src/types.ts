import Field from "./field";

export interface FieldBuilder {
  buildFixtureProperty(increment: number);
}
export interface DateBuilderOptions {
  incrementDay: boolean;
}
export interface BuilderReturnFunction {
  (increment: number): Field;
}




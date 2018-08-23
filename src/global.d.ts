import Fixture from "./fixture";
export { };
import {FieldBuilder, DateBuilderOptions, BuilderReturnFunction} from "./types";
declare global {
  interface String {
    withValue(valuePrefix: string): FieldBuilder;
    asConstant(valueConstant: string): FieldBuilder;
    asDate(options?: DateBuilderOptions): FieldBuilder;
    asNumber(): FieldBuilder;
    asBoolean(): FieldBuilder;
    asEmail(): FieldBuilder;
    asArray(length?: number): FieldBuilder;
    fromFixture(fixture: Fixture): FieldBuilder;
    as(func: (increment: number) => any): FieldBuilder;
    pickFrom(options: Array): FieldBuilder;
  }
}

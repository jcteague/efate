import Fixture from './index';
export {};
import {
  BuilderReturnFunction,
  ArrayBuilderOptions,
  DateBuilderOptions,
  LoremIpsumOptions
} from './types';
declare global {
  interface String {
    withValue(valuePrefix: string): BuilderReturnFunction;
    asConstant(valueConstant: string): BuilderReturnFunction;
    asDate(options?: DateBuilderOptions): BuilderReturnFunction;
    asNumber(): BuilderReturnFunction;
    asBoolean(): BuilderReturnFunction;
    asEmail(): BuilderReturnFunction;
    asArray(options?: ArrayBuilderOptions): BuilderReturnFunction;
    fromFixture(fixture: any): BuilderReturnFunction;
    arrayOfFixture(fixture: any): BuilderReturnFunction;
    as(func: (increment: number) => any): BuilderReturnFunction;
    pickFrom(options: any[]): BuilderReturnFunction;
    asFirstName(): BuilderReturnFunction;
    asLastName(): BuilderReturnFunction;
    asFullName(): BuilderReturnFunction;
    asLoremIpsum(options?: LoremIpsumOptions);
  }
}

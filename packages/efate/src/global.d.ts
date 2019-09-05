import Fixture from './fixture';
export {};
import { BuilderReturnFunction, DateBuilderOptions, LoremIpsumOptions } from './types';
declare global {
  interface String {
    withValue(valuePrefix: string): BuilderReturnFunction;
    asConstant(valueConstant: string): BuilderReturnFunction;
    asDate(options?: DateBuilderOptions): BuilderReturnFunction;
    asNumber(): BuilderReturnFunction;
    asBoolean(): BuilderReturnFunction;
    asEmail(): BuilderReturnFunction;
    asArray(length?: number): BuilderReturnFunction;
    fromFixture(fixture: Fixture): BuilderReturnFunction;
    as(func: (increment: number) => any): BuilderReturnFunction;
    pickFrom(options: any[]): BuilderReturnFunction;
    asFirstName(): BuilderReturnFunction;
    asLastName(): BuilderReturnFunction;
    asFullName(): BuilderReturnFunction;
    asLoremIpsum(options?: LoremIpsumOptions);
  }
}

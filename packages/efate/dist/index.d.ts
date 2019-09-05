import Fixture from './fixture';
import { attachBuilderToStringProto } from './utils';
import { BuilderReturnFunction } from "./types";
import Field from './field';
declare const propertyBuilders: {
    asStringBuilder: (this: string) => BuilderReturnFunction;
    asArrayBuilder: (this: string, length?: number) => BuilderReturnFunction;
    asNumberBuilder: (this: string) => BuilderReturnFunction;
    asBooleanBuilder: (this: string) => BuilderReturnFunction;
    asDateBuilder: (this: string, options?: import("./types").DateBuilderOptions) => BuilderReturnFunction;
};
export default Fixture;
export { attachBuilderToStringProto, BuilderReturnFunction, Field, propertyBuilders, };

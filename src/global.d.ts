export { };
import {FieldBuilder} from "./types";
declare global {
  interface String {
    withValue(valuePrefix: string): FieldBuilder;
    withConstant(valueConstant: string): FieldBuilder;
  }
}


export {};
import {BuilderReturnFunction} from "efate";

declare global {
  interface String {
    asUUID(): BuilderReturnFunction
  }
}
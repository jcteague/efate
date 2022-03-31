import {
  asStringBuilder,
  firstNameBuilder, fullNameBuilder,
  lastNameBuilder, withConstantBuilder,
  withValueBuilder
} from "./string-field-builder";
import asBooleanBuilder from "./boolean-field-builder";
import Field from "../field";
import pickFromFieldBuilder from "./pick-from-field-builder";
import asNumberBuilder from "./number-field-builder";
import {ArrayBuilderOptions, DateBuilderOptions, LoremIpsumOptions} from "../types";
import asDateBuilder from "./date-field-builder";
import Fixture from "../fixture";
import fromFixtureBuilder from "./from-fixture-field-builder";
import asArrayBuilder from "./array-field-builder";
import asEmailBuilder from "./email-field-builder";
import buildFromFunction from "./function-field-builder";
import ArrayOfFixtureBuilder, {ArrayOfFixtureBuilderOptions} from "./array-of-fixture-builder";
import arrayOfFixtureBuilder from "./array-of-fixture-builder";
import loremIpsumBuilder from "./lorem-ipsum-field-builder";

export type DefineFieldAction<T> = (generator: FieldTypeBuilder<T>) => void;


export type FieldTypeBuilder<T> = {
  [P in keyof T]: FieldTypeSelector
}

export interface FieldTypeSelector {
  asBoolean: ()  => void;
  asNumber: ()  => void;
  asString: ()  => void;
  withValue: (value: string) => void;
  asConstant: (constantValue: string) => void;
  firstName:() => void;
  lastName:() => void;
  fullName:() => void;
  pickFrom: (options: any[]) => void;
  asDate: (options?: DateBuilderOptions) => void;
  fromFixture: <T>(fixture: Fixture<T>) => void;
  asArray: <T>(options?:ArrayBuilderOptions) => void;
  asEmail: () => void;
  as: <T>(fn: (increment: number) => T) => void;
  arrayOfFixture: <T>(options: ArrayOfFixtureBuilderOptions<T>) => void;
  asLoremIpsum:(options?: LoremIpsumOptions) => void;

}
export type GenerateFieldFunc<T extends FieldTypeSelector = FieldTypeSelector> = (builders, fieldName: string) => T;

export const fieldTypeSelector = (builders, fieldName:string): FieldTypeSelector => ({

  asBoolean(){
    builders.push(asBooleanBuilder(fieldName))
  },
  asNumber(){
    builders.push(asNumberBuilder(fieldName))
  },
  asString(){
    builders.push(asStringBuilder(fieldName));
  },
  withValue(value: string){ builders.push(withValueBuilder(fieldName, value))},
  asConstant(value: string){builders.push(withConstantBuilder(fieldName, value))},
  firstName(){
    builders.push(firstNameBuilder(fieldName));
  },
  lastName(){builders.push(lastNameBuilder(fieldName))},
  fullName(){builders.push(fullNameBuilder(fieldName))},
  pickFrom(options){builders.push(pickFromFieldBuilder(fieldName, options))},
  asDate(options?) {builders.push(asDateBuilder(fieldName, options))},
  fromFixture(fixture) {builders.push(fromFixtureBuilder(fieldName, fixture))},
  asArray(options?){builders.push(asArrayBuilder(fieldName, options))},
  asEmail(){builders.push(asEmailBuilder(fieldName))},
  as(fn){builders.push(buildFromFunction(fieldName, fn))},
  arrayOfFixture(options){builders.push(arrayOfFixtureBuilder(fieldName, options))},
  asLoremIpsum(options?){builders.push(loremIpsumBuilder(fieldName, options))},
});

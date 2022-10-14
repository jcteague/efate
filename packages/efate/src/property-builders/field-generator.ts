import {
  asStringBuilder,
  firstNameBuilder,
  fullNameBuilder,
  lastNameBuilder,
  withConstantBuilder,
  withValueBuilder,
} from './string-field-builder';
import asBooleanBuilder from './boolean-field-builder';
import Field from '../field';
import pickFromFieldBuilder from './pick-from-field-builder';
import asNumberBuilder from './number-field-builder';
import { BuilderReturnFunction, DateBuilderOptions, LoremIpsumOptions } from '../types';
import asDateBuilder from './date-field-builder';
import Fixture from '../fixture';
import fromFixtureBuilder from './from-fixture-field-builder';
import asArrayBuilder, { ArrayBuilderOptions } from './array-field-builder';
import asEmailBuilder from './email-field-builder';
import buildFromFunction from './function-field-builder';
import ArrayOfFixtureBuilder, { ArrayOfFixtureBuilderOptions } from './array-of-fixture-builder';
import arrayOfFixtureBuilder from './array-of-fixture-builder';
import loremIpsumBuilder from './lorem-ipsum-field-builder';

export interface FieldTypeSelector {
  asBoolean: () => void;
  asNumber: () => void;
  asString: () => void;
  withValue: (value: string) => void;
  asConstant: (constantValue: string) => void;
  firstName: () => void;
  lastName: () => void;
  fullName: () => void;
  pickFrom: (options: any[]) => void;
  asDate: (options?: DateBuilderOptions) => void;
  fromFixture: <T>(fixture: Fixture<T>) => void;
  asArray: <T>(options?: ArrayBuilderOptions) => void;
  asEmail: () => void;
  as: <T>(fn: (increment: number) => T) => void;
  arrayOfFixture: <T>(options: ArrayOfFixtureBuilderOptions<T>) => void;
  asLoremIpsum: (options?: LoremIpsumOptions) => void;
  extends: <T>(fixture: Fixture<T>) => void;
}

export const fieldTypeGenerators = {
  asBoolean: asBooleanBuilder,
  asNumber: asNumberBuilder,
  asString: asStringBuilder,
  withValue: withValueBuilder,
  asConstant: withConstantBuilder,
  firstName: firstNameBuilder,
  lastName: lastNameBuilder,
  fullName: fullNameBuilder,
  pickFrom: pickFromFieldBuilder,
  asDate: asDateBuilder,
  fromFixture: fromFixtureBuilder,
  asArray: asArrayBuilder,
  asEmail: asEmailBuilder,
  as: buildFromFunction,
  arrayOfFixture: arrayOfFixtureBuilder,
  asLoremIpsum: loremIpsumBuilder,
};

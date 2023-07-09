import Fixture from '../fixture';
import asArrayBuilder, { ArrayBuilderOptions } from './array-field-builder';
import { ArrayOfFixtureBuilderOptions } from './array-of-fixture-builder';
import arrayOfFixtureBuilder from './array-of-fixture-builder';
import asBooleanBuilder from './boolean-field-builder';
import asDateBuilder, { DateBuilderOptions } from './date-field-builder';
import asEmailBuilder from './email-field-builder';
import fromFixtureBuilder from './from-fixture-field-builder';
import buildFromFunction from './function-field-builder';
import loremIpsumBuilder, { LoremIpsumOptions } from './lorem-ipsum-field-builder';
import asNumberBuilder from './number-field-builder';
import pickFromFieldBuilder from './pick-from-field-builder';
import {
  asStringBuilder,
  firstNameBuilder,
  fullNameBuilder,
  lastNameBuilder,
  withConstantBuilder,
  withValueBuilder,
} from './string-field-builder';

export interface FieldTypeBuilder {
  asBoolean: () => void;
  asNumber: () => void;
  asString: () => void;
  withValue: (value: string) => void;
  asConstant: (constantValue: string) => void;
  firstName: () => void;
  lastName: () => void;
  fullName: () => void;
  pickFrom: (options: unknown[]) => void;
  asDate: (options?: DateBuilderOptions) => void;
  fromFixture: <T>(fixture: Fixture<T>) => void;
  asArray: (options?: ArrayBuilderOptions) => void;
  asEmail: () => void;
  as: <T>(fn: (increment: number) => T) => void;
  arrayOfFixture: <T>(options: ArrayOfFixtureBuilderOptions<T>) => void;
  asLoremIpsum: (options?: LoremIpsumOptions) => void;
  extends: <T>(fixture: Fixture<T>) => void;
}

export const fieldTypeBuilder = {
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

import Fixture from './fixture';
import { attachBuilderToStringProto } from './utils';
import { BuilderReturnFunction } from './types';
import Field from './field';

import asArrayBuilder from './property-builders/array-field-builder';
import asNumberBuilder from './property-builders/number-field-builder';
import asBooleanBuilder from './property-builders/boolean-field-builder';
import asDateBuilder from './property-builders/date-field-builder';
import asEmailbuilder from './property-builders/email-field-builder';
import fromFixtureBuilder from './property-builders/from-fixture-field-builder';
import buildFromFunction from './property-builders/function-field-builder';
import arrayOfFixtureBuilder from './property-builders/array-of-fixture-builder';

import { asStringBuilder } from './property-builders/string-field-builder';

const propertyBuilders = {
  asStringBuilder,
  asArrayBuilder,
  asNumberBuilder,
  asBooleanBuilder,
  asDateBuilder,
  asEmailbuilder,
  fromFixtureBuilder,
  buildFromFunction,
  arrayOfFixtureBuilder
};
import {
  ArrayBuilderOptions,
  DateBuilderOptions,
  LoremIpsumOptions
} from './types';

export default Fixture;
export {
  attachBuilderToStringProto,
  BuilderReturnFunction,
  Field,
  propertyBuilders
};

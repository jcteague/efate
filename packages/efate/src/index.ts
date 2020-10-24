import Fixture from './fixture';
import { attachBuilderToStringProto } from './utils';
import { BuilderReturnFunction } from './types';
import Field from './field';
import stringBuilder from './property-builders/string-field-builder';
import asArrayBuilder from './property-builders/array-field-builder';
import asNumberBuilder from './property-builders/number-field-builder';
import asBooleanBuilder from './property-builders/boolean-field-builder';
import asDateBuilder from './property-builders/date-field-builder';
import { asStringBuilder } from './property-builders/string-field-builder';

const propertyBuilders = {
  asStringBuilder,
  asArrayBuilder,
  asNumberBuilder,
  asBooleanBuilder,
  asDateBuilder
};

export default Fixture;
export {
  attachBuilderToStringProto,
  BuilderReturnFunction,
  Field,
  propertyBuilders
};

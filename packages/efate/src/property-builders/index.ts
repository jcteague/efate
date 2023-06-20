import asArrayBuilder from './array-field-builder';
import arrayOfFixtureBuilder from './array-of-fixture-builder';
import asBooleanBuilder from './boolean-field-builder';
import asDateBuilder from './date-field-builder';
import asEmailBuilder from './email-field-builder';
import fromFixtureBuilder from './from-fixture-field-builder';
import buildFromFunction from './function-field-builder';
import loremIpsumBuilder from './lorem-ipsum-field-builder';
import asNumberBuilder from './number-field-builder';
import pickFromBuilder from './pick-from-field-builder';
import { asStringBuilder } from './string-field-builder';

const fieldBuilders = {
  asArrayBuilder,
  asBooleanBuilder,
  asDateBuilder,
  asEmailBuilder,
  fromFixtureBuilder,
  buildFromFunction,
  loremIpsumBuilder,
  asStringBuilder,
  asNumberBuilder,
  pickFromBuilder,
  arrayOfFixtureBuilder,
};
export { fieldBuilders };

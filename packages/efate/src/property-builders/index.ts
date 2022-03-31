import Field from '../field';
import { BuilderReturnFunction } from '../types';
import asArrayBuilder from "./array-field-builder";
import asBooleanBuilder from'./boolean-field-builder';
import asDateBuilder from './date-field-builder';
import asEmailBuilder from './email-field-builder';
import fromFixtureBuilder from './from-fixture-field-builder';
import buildFromFunction from "./function-field-builder";
import loremIpsumBuilder from "./lorem-ipsum-field-builder";;
import './number-field-builder';
import './pick-from-field-builder';
import './array-of-fixture-builder';
import {asStringBuilder} from './string-field-builder';
import * as debugFn from 'debug';
const debug = debugFn('efate:property-builder');

const fieldBuilders = {
  asArrayBuilder,
  asBooleanBuilder,
  asDateBuilder,
  asEmailBuilder,
  fromFixtureBuilder,
  buildFromFunction,
  loremIpsumBuilder,
  asStringBuilder



}
export { fieldBuilders }
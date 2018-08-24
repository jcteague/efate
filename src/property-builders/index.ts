import Field from '../field';
import { FieldBuilder } from '../types';
import { isFunction, isString } from '../utils';
import './array-field-builder';
import './boolean-field-builder';
import './date-field-builder';
import './email-field-builder';
import './from-fixture-field-builder';
import './function-field-builder';
import './lorem-ipsum-field-builder';
import './number-field-builder';
import './pick-from-field-builder';
import stringBuilder from './string-field-builder';

export interface FieldFixtureGenerator {
  generateField(builder: string | FieldBuilder, instanceCounter: number): Field;
}

export default {
  generateField(
    builder: string | FieldBuilder,
    instanceCounter: number
  ): Field {
    if (isString(builder)) {
      return stringBuilder.buildFixtureProperty(builder, instanceCounter);
    }
    if (isFunction(builder)) {
      return builder(instanceCounter);
    }
    throw new Error(`Unsupported builder type ${typeof builder}`);
  }
} as FieldFixtureGenerator;

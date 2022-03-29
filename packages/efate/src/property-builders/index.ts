import Field from '../field';
import { BuilderReturnFunction } from '../types';
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
import './array-of-fixture-builder';
import stringBuilder from './string-field-builder';
import * as debugFn from 'debug';
const debug = debugFn('efate:property-builder');

export interface FieldFixtureGenerator {
  generateField<T>(
    builder: (keyof T) | BuilderReturnFunction,
    instanceCounter: number
  ): Field;
}

export default {
  generateField<T>(
    builder: (keyof T)| BuilderReturnFunction,
    instanceCounter: number
  ): Field {
    if (isString(builder)) {
      return stringBuilder(builder, instanceCounter);
    }
    if (isFunction(builder)) {
      return builder(instanceCounter);
    }
    debug(`unsupported builder: %o`, builder);
    throw new Error(`Unsupported builder type ${typeof builder}`);
  }
} as FieldFixtureGenerator;

import {FieldBuilder} from "../types";
import Field from '../field';
import {isFunction, isString} from "../utils";
import stringBuilder from './string-field-builder';
import './date-field-builder';
import './number-field-builder';
import './array-field-builder';
import './email-field-builder';
import './boolean-field-builder';
import './from-fixture-field-builder';
import './function-field-builder';
import './pick-from-field-builder';

export interface FieldFixtureGenerator {
  generateField(builder: (string | FieldBuilder), instanceCounter: number) : Field;
}

export default <FieldFixtureGenerator>{
  generateField(builder: (string | FieldBuilder), instanceCounter: number) : Field {
    if (isString(builder)) {
      return stringBuilder.buildFixtureProperty(builder,instanceCounter);
    }
    if (isFunction(builder)) {
      return builder(instanceCounter);
    }
    throw new Error(`Unsupported builder type ${typeof builder}`);
  }
};


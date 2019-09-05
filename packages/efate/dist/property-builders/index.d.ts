import Field from '../field';
import { BuilderReturnFunction } from '../types';
import './array-field-builder';
import './boolean-field-builder';
import './date-field-builder';
import './email-field-builder';
import './from-fixture-field-builder';
import './function-field-builder';
import './lorem-ipsum-field-builder';
import './number-field-builder';
import './pick-from-field-builder';
export interface FieldFixtureGenerator {
    generateField(builder: string | BuilderReturnFunction, instanceCounter: number): Field;
}
declare const _default: FieldFixtureGenerator;
export default _default;

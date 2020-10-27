import Field from '../field';
import { BuilderReturnFunction } from '../types';
import { createBuilder, attachBuilderToStringProto } from '../utils';
import { firstNames, lastNames } from './names';
import * as debugFn from 'debug';
const debug = debugFn('efate:string-field-builder');

const asStringBuilder = function(this: string): BuilderReturnFunction {
  const fieldName = this;
  debug('string builder field = %s', fieldName);
  return (increment: number): Field =>
    new Field(fieldName, `${fieldName}${increment}`);
};

const withValueBuilder = function(
  this: string,
  valuePrefix: string
): BuilderReturnFunction {
  const fieldName = this;
  return (increment: number) =>
    new Field(fieldName, `${valuePrefix}${increment}`);
};
const withConstantBuilder = function(
  this: string,
  valueConstant: any
): BuilderReturnFunction {
  const fieldName = this;
  return () => new Field(fieldName, valueConstant);
};

const getRandomElement = (list: any[]) => {
  const i = Math.floor(Math.random() * list.length);
  return list[i];
};

const firstNameBuilder = createBuilder<string>(
  'asFirstName',
  ()=>getRandomElement(firstNames))
const lastNameBuilder = createBuilder<string>(
  'asLastName',
  ()=>getRandomElement(lastNames))
const fullNameBuilder = createBuilder<string>(
  'asFullName',
  ()=> `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`)


attachBuilderToStringProto('withValue', withValueBuilder);
attachBuilderToStringProto('asConstant', withConstantBuilder);

// export const withValueBuilder;
export default (name: string, increment: number): Field => {
  return new Field(name, `${name}${increment}`);
};

export {
  withValueBuilder,
  withConstantBuilder,
  firstNameBuilder,
  lastNameBuilder,
  fullNameBuilder,
  asStringBuilder
};

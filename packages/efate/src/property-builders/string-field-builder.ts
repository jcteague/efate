import Field from '../field';
import { firstNames, lastNames } from './names';
import * as debugFn from 'debug';
const debug = debugFn('efate:string-field-builder');

const asStringBuilder = (fieldName: string) => (increment: number) =>
  new Field(fieldName, `${fieldName}${increment}`);

const withValueBuilder = (fieldName: string, [value]: [string]) => (increment: number) =>
  new Field(fieldName, `${value}${increment}`);

const withConstantBuilder = (fieldName: string, [constantValue]: [string]) => (increment: number) =>
  new Field(fieldName, constantValue);

const getRandomElement = (list: any[]) => {
  const i = Math.floor(Math.random() * list.length);
  return list[i];
};

const firstNameBuilder = (fieldName: string) => (increment: number) =>
  new Field(fieldName, getRandomElement(firstNames));

const lastNameBuilder = (fieldName: string) => (increment: number) =>
  new Field(fieldName, getRandomElement(lastNames));

const fullNameBuilder = (fieldName: string) => (increment: number) =>
  new Field(fieldName, `${getRandomElement(firstNames)} ${getRandomElement(lastNames)}`);

export {
  withValueBuilder,
  withConstantBuilder,
  firstNameBuilder,
  lastNameBuilder,
  fullNameBuilder,
  asStringBuilder,
};

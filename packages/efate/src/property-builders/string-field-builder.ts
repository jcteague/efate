import { FIRST_NAMES, LAST_NAMES } from '../constants';
import Field from '../field';

const asStringBuilder = (fieldName: string) => (increment: number) =>
  new Field(fieldName, `${fieldName}${increment}`);

const withValueBuilder =
  (fieldName: string, [value]: [string]) =>
  (increment: number) =>
    new Field(fieldName, `${value}${increment}`);

const withConstantBuilder =
  (fieldName: string, [constantValue]: [string]) =>
  () =>
    new Field(fieldName, constantValue);

const getRandomElement = (list: string[]) => {
  const i = Math.floor(Math.random() * list.length);
  return list[i];
};

const firstNameBuilder = (fieldName: string) => () =>
  new Field(fieldName, getRandomElement(FIRST_NAMES));

const lastNameBuilder = (fieldName: string) => () =>
  new Field(fieldName, getRandomElement(LAST_NAMES));

const fullNameBuilder = (fieldName: string) => () =>
  new Field(fieldName, `${getRandomElement(FIRST_NAMES)} ${getRandomElement(LAST_NAMES)}`);

export {
  asStringBuilder,
  firstNameBuilder,
  fullNameBuilder,
  lastNameBuilder,
  withConstantBuilder,
  withValueBuilder,
};

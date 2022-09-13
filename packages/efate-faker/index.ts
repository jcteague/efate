import { faker, Faker } from '@faker-js/faker';
const { Field } = require('efate');

export interface FakerExtension {
  faker: (fake: (f: Faker, increment: number) => any) => void;
}

export const fakerExtension = {
  faker:
    (fieldName, [fake]: [(f: Faker, increment: number) => any]) =>
    (increment) =>
      new Field(fieldName, fake(faker, increment)),
};

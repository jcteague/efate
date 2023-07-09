import { Faker, faker } from '@faker-js/faker';
import { Field } from 'efate';

export interface FakerExtension {
  faker: (fake: (f: Faker, increment: number) => void) => void;
}

export const fakerExtension = {
  faker:
    (fieldName: string, [fake]: [(f: Faker, increment: number) => never]) =>
    (increment: number) =>
      new Field(fieldName, fake(faker, increment)),
};

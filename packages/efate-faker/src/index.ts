import { Faker,faker } from '@faker-js/faker';
import { Field } from 'efate';

export interface FakerExtension {
  faker: (fake: (f: Faker, increment: number) => any) => void;
}

export const fakerExtension = {
  faker:
    (fieldName: string, [fake]: [(f: Faker, increment: number) => any]) =>
    (increment: number) =>
      new Field(fieldName, fake(faker, increment)),
};

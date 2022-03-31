import Field from '../field';

const asEmailBuilder = (fieldName: string) =>
    (increment: number) =>
      new Field(fieldName, `email${increment}@example.com`);

export default asEmailBuilder;

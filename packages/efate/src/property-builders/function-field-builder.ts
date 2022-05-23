import Field from '../field';
const buildFromFunction =
  <T>(fieldName: string, [func]: [(inc: number) => T]) =>
  (increment: number) =>
    new Field(fieldName, func(increment));

export default buildFromFunction;

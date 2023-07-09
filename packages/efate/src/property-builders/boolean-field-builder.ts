import Field from '../field';

const asBooleanBuilder = (fieldName: string) => () =>
  new Field(fieldName, !!Math.floor(Math.random() * 2));

export default asBooleanBuilder;

import { createBuilder } from '../utils';

const asBooleanBuilder = createBuilder<boolean>('asBoolean',
  () => !!Math.floor(Math.random() * 2));

export default asBooleanBuilder;

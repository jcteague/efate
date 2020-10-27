import Field from '../field';
import { BuilderReturnFunction, DateBuilderOptions } from '../types';
import { createBuilder } from '../utils';

const asEmailBuilder = createBuilder<string>(
  'asEmail',
  (inc) => `email${inc}@example.com`)

export default asEmailBuilder;

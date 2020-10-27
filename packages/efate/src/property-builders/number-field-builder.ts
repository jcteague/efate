import Field from '../field';
import { BuilderReturnFunction, DateBuilderOptions } from '../types';
import { createBuilder } from '../utils';

const asNumberBuilder = createBuilder<number>(
  'asNumber',
  (increment: number) => increment)

export default asNumberBuilder;

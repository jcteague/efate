import Field from '../field';
import {
  ArrayBuilderOptions,
  BuilderReturnFunction,
  DateBuilderOptions
} from '../types';
import { attachBuilderToStringProto } from '../utils';
import { propertyBuilders } from '../index';
import * as _debug from 'debug';
const debug = _debug('efate:array-builder');
const asArrayBuilder = function(
  this: string,
  {
    length = 1,
    builder = propertyBuilders.asStringBuilder
  }: ArrayBuilderOptions = {}
): BuilderReturnFunction {
  const fieldName = this;
  const createArray = () => {
    const arr: any[] = [];
    debug(`creating array for ${fieldName}`);
    const boundBuilder = builder.bind(fieldName)();
    for (let i = 1; i < length + 1; i++) {
      arr.push(boundBuilder(i).value);
    }
    return arr;
  };
  return () => {
    return new Field(fieldName, createArray());
  };
};

attachBuilderToStringProto('asArray', asArrayBuilder);
export default asArrayBuilder;

import Field from '../field';
import { BuilderReturnFunction, DateBuilderOptions } from '../types';
import { propertyBuilders } from '../index';
import * as _debug from 'debug';
const debug = _debug('efate:array-builder');

export interface ArrayBuilderOptions {
  length?: number;
  builder?: (property: string, ...args: any[]) => <T>(...args: any[]) => BuilderReturnFunction<T>;
}

const defaultOptions: ArrayBuilderOptions = {
  length: 1,
  // builder: (fieldName, ...args:any[])=> propertyBuilders.asStringBuilder,
};

const asArrayBuilder =
  (fieldName: string, options?: ArrayBuilderOptions) => (increment: number) => {
    const length = options?.length ?? defaultOptions.length;
    const builder = options?.builder ?? defaultOptions.builder;
    const arr: any[] = [];
    // const fieldBuilder = builder!();
    for (let i = 1; i < length! + 1; i++) {
      const value = propertyBuilders.asStringBuilder(fieldName)(i).value;
      arr.push(value);
    }
    return new Field(fieldName, arr);
  };

export default asArrayBuilder;

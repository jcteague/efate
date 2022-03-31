import Field from '../field';
import {
  ArrayBuilderOptions,
  BuilderReturnFunction,
  DateBuilderOptions
} from '../types';
import { propertyBuilders } from '../index';
import * as _debug from 'debug';
const debug = _debug('efate:array-builder');

const defaultOptions: ArrayBuilderOptions = {
  length: 1,
  builder: ()=>propertyBuilders.asStringBuilder,
}

const asArrayBuilder = <T>(fieldName: string, options?: ArrayBuilderOptions) =>
  (increment: number) =>{
    const length = options?.length ?? defaultOptions.length;
    const builder = options?.builder ?? defaultOptions.builder;
    const arr: Array<Field<T>> = [];
    const fieldBuilder = builder!();
    for(let i = 1; i< length!+1; i++){
      arr.push(fieldBuilder(fieldName)(i).value);
    }
    return new Field(fieldName,arr);

  }

export default asArrayBuilder;

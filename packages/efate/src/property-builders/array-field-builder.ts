import Field from '../field';
import { fieldBuilders } from './index';

export interface ArrayBuilderOptions {
  length?: number;
}

const defaultOptions: Required<ArrayBuilderOptions> = {
  length: 1,
};

const asArrayBuilder =
  (fieldName: string, [options]: [ArrayBuilderOptions]) =>
  () => {
    const { length } = { ...defaultOptions, ...options };

    const results: string[] = [];

    for (let i = 1; i < length + 1; i++) {
      const value = fieldBuilders.asStringBuilder(fieldName)(i).value;
      results.push(value);
    }

    return new Field(fieldName, results);
  };

export default asArrayBuilder;

import Field from '../field';
import { BuilderReturnFunction, DateBuilderOptions } from '../types';
import { attachBuilderToStringProto } from '../utils';

const pickFromBuilder = function(
  this: string,
  options: any[]
): BuilderReturnFunction {
  if (!options || options.length === 0) {
    throw new Error('options to pick values from not provided');
  }
  const fieldName = this;
  return () => {
    return new Field(
      fieldName,
      options[Math.floor(Math.random() * options.length)]
    );
  };
};

attachBuilderToStringProto('pickFrom', pickFromBuilder);
export default pickFromBuilder;

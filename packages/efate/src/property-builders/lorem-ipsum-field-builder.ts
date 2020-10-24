import Field from '../field';
import { BuilderReturnFunction, LoremIpsumOptions } from '../types';
import { attachBuilderToStringProto } from '../utils';
import { loremIpsumText } from './lorem-ipsum';
const defaultOptions: LoremIpsumOptions = {
  maxLength: 25,
  minLength: 10
};
const generateText = ({ minLength, maxLength }: LoremIpsumOptions): string => {
  const constrainedMaxLength = loremIpsumText.length - maxLength;
  const startPosition = Math.floor(Math.random() * constrainedMaxLength);
  const length =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  return loremIpsumText.substr(startPosition, length);
};

const loremIpsumBuilder = function(
  this: string,
  options: LoremIpsumOptions = defaultOptions
): BuilderReturnFunction {
  const fieldName = this;
  return () => {
    return new Field(fieldName, generateText(options));
  };
};

attachBuilderToStringProto('asLoremIpsum', loremIpsumBuilder);
export default loremIpsumBuilder;

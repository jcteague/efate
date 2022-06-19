import Field from '../field';
import { BuilderReturnFunction, LoremIpsumOptions } from '../types';
import { loremIpsumText } from './lorem-ipsum';
const defaultOptions: LoremIpsumOptions = {
  maxLength: 25,
  minLength: 10,
};
const generateText = ({ minLength, maxLength }: LoremIpsumOptions): string => {
  const constrainedMaxLength = loremIpsumText.length - maxLength;
  const startPosition = Math.floor(Math.random() * constrainedMaxLength);
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  return loremIpsumText.substr(startPosition, length);
};

const loremIpsumBuilder =
  (fieldName: string, [options]: [Partial<LoremIpsumOptions>?]) =>
  (increment: number) => {
    const optionsWithDefaults = { ...defaultOptions, ...options };
    return new Field(fieldName, generateText(optionsWithDefaults));
  };

export default loremIpsumBuilder;

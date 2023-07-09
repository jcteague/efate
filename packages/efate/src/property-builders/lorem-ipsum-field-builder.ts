import { LOREM_IPSUM } from '../constants';
import Field from '../field';

export type LoremIpsumOptions = {
  minLength: number;
  maxLength: number;
};

const defaultOptions: LoremIpsumOptions = {
  maxLength: 25,
  minLength: 10,
};

const generateText = ({ minLength, maxLength }: LoremIpsumOptions): string => {
  const constrainedMaxLength = LOREM_IPSUM.length - maxLength;
  const startPosition = Math.floor(Math.random() * constrainedMaxLength);
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  return LOREM_IPSUM.substr(startPosition, length);
};

const loremIpsumBuilder =
  (fieldName: string, [options]: [Partial<LoremIpsumOptions>?]) =>
  () => {
    const optionsWithDefaults = { ...defaultOptions, ...options };
    return new Field(fieldName, generateText(optionsWithDefaults));
  };

export default loremIpsumBuilder;

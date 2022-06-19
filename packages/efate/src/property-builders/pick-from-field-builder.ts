import Field from '../field';

const pickFromBuilder =
  (fieldName: string, [options]: [any[]]) =>
  (increment: number) => {
    if (!options || options.length === 0) {
      throw new Error('missing or empty options array');
    }
    return new Field(fieldName, options[Math.floor(Math.random() * options.length)]);
  };

export default pickFromBuilder;

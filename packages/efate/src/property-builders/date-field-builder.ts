import Field from '../field';
import { DateBuilderOptions } from '../types';

const defaultOptions = {
  incrementDay: false,
} as DateBuilderOptions;
[];

const asDateBuilder =
  (fieldName: string, [options]: [DateBuilderOptions?] = [defaultOptions]) =>
  (increment: number) => {
    const date = new Date();
    if (options?.incrementDay) {
      date.setDate(date.getDate() + (increment - 1));
    }
    return new Field(fieldName, date);
  };

export default asDateBuilder;

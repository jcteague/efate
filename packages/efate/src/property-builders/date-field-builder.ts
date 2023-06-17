import Field from '../field';
import { DateBuilderOptions } from '../types';

const defaultOptions = {
  incrementDay: false,
  formatter: (date: Date) => date
}

const asDateBuilder =
  (fieldName: string, [options]: [DateBuilderOptions?]) =>
  (increment: number) => {
    const { incrementDay, formatter } = {...defaultOptions, ...options}
    
    const date = new Date()
    
    if (incrementDay) {
      date.setDate(date.getDate() + (increment - 1));
    }

    return new Field(fieldName, formatter(date));
  };

export default asDateBuilder;

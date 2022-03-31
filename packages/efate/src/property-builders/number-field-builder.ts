import Field from '../field';

const asNumberBuilder = (fieldName: string) => (increment: number) => new Field(fieldName, increment);

export default asNumberBuilder;

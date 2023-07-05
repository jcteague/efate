import { Field } from 'efate';
import { v4 } from 'uuid';

const uuidBuilder = (fieldName: string) => () => new Field(fieldName, v4());

export interface UUIDExtension {
  asUUID: () => void;
}

export const uuidFieldExtension = {
  asUUID: uuidBuilder,
};

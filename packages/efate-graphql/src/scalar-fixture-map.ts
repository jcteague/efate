import {propertyBuilders} from 'efate';
import uuidBuilder from "efate-uuid/dist/index";
export const scalarMap = {
  'STRING': propertyBuilders.asStringBuilder,
  'INT': propertyBuilders.asNumberBuilder,
  'FLOAT': propertyBuilders.asNumberBuilder,
  'BOOLEAN': propertyBuilders.asBooleanBuilder,
  'ID': uuidBuilder,
};

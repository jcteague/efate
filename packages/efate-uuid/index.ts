// tslint:disable-next-line
/// <reference path="./global.d.ts" />
import {attachBuilderToStringProto, Field, BuilderReturnFunction} from 'efate';
import {v4} from 'uuid';

const uuidBuilder = function(this: string): BuilderReturnFunction{
  const fieldName = this;
  return () =>
    new Field(fieldName, v4())
};

attachBuilderToStringProto('asUUID', uuidBuilder);
export default uuidBuilder;
/// <reference path="./global.d.ts" />
import PropertyBuilder from "./property-builders";
import {FieldBuilder} from "./types";
import {isObject, isFunction} from './utils';

type OverrideObject = {[key: string]: any};
type OverrideFunction = (fixture: any) => void;
type OverrideParameter = OverrideObject|OverrideFunction;
export default class Fixture {
  private instanceCount: number;
  private builders: (string | FieldBuilder)[];
  constructor(...fields: (string | FieldBuilder)[]) {
    this.instanceCount = 1;
    this.builders = fields;
  }
  create(overrides: OverrideParameter = {}){
    const fixture = {};
    this.builders.forEach(builder => {
      let {name, value} = PropertyBuilder.generateField(builder, this.instanceCount);

      if (name in overrides) {
        value = overrides[name];
      }
      Object.defineProperty(fixture, name,
        {
          value: value,
          enumerable: true,
          writable: true
      });

      if (typeof overrides === 'function') {
        overrides(fixture);
      }
    });
    return fixture;
  }


}
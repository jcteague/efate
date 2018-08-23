/// <reference path="./global.d.ts" />
import PropertyBuilder from "./property-builders";
import {FieldBuilder} from "./types";
import {isObject, isFunction} from './utils';

interface Override {
  [key: string]: any;
  func: (fixture: any) => void;
}


type OverrideObject = {[key: string]: any};
type OverrideFunction = (fixture: any) => void;

function applyOverrides(fixture: {}, overrides: {}) {
  if (isFunction(overrides)) {
    overrides(fixture);
  } else {
    Object.keys(overrides).forEach(k => {
      fixture[k] = overrides[k];
    })
  }
}
export default class Fixture {
  private instanceCount: number;
  private builders: (string | FieldBuilder)[];
  constructor(...fields: (string | FieldBuilder)[]) {
    this.instanceCount = 1;
    this.builders = fields;
  }
  create(overrides?: OverrideFunction);
  create(overrides?: OverrideObject);
  create(overrides = {}): any
  {
    const fixture = {};
    this.builders.forEach(builder => {
      let {name, value} = PropertyBuilder.generateField(builder, this.instanceCount);
      Object.defineProperty(fixture, name,
        {
          value: value,
          enumerable: true,
          writable: true
      });


      applyOverrides(fixture, overrides);

    });
    this.instanceCount++;
    return fixture;
  }


}
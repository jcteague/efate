// tslint:disable-next-line
/// <reference path="./global.d.ts" />
import PropertyBuilder from './property-builders';
import { FieldBuilder } from './types';
import { isObject, isFunction } from './utils';

interface Override {
  [key: string]: any;
  func: (fixture: any) => void;
}

interface OverrideObject {
  [key: string]: any;
}
type OverrideFunction = (fixture: any) => void;

function applyOverrides(fixture: {}, overrides: {}) {
  if (isFunction(overrides)) {
    overrides(fixture);
  } else {
    Object.keys(overrides).forEach(k => {
      fixture[k] = overrides[k];
    });
  }
}
export default class Fixture {
  private instanceCount: number;
  private builders: Array<string | FieldBuilder>;
  constructor(...fields: Array<string | FieldBuilder>) {
    this.instanceCount = 1;
    this.builders = fields;
  }
  public create(overrides?: OverrideFunction);
  public create(overrides?: OverrideObject); // tslint:disable-line
  public create(overrides = {}): any {
    const fixture = {};
    this.builders.forEach(builder => {
      const { name, value } = PropertyBuilder.generateField(
        builder,
        this.instanceCount
      );
      Object.defineProperty(fixture, name, {
        value,
        enumerable: true,
        writable: true
      });

      applyOverrides(fixture, overrides);
    });
    this.instanceCount++;
    return fixture;
  }
}

// tslint:disable-next-line
/// <reference path="./global.d.ts" />
import PropertyBuilder from './property-builders';
import { BuilderReturnFunction } from './types';
import { isObject, isFunction } from './utils';
import * as debugGenerator from 'debug';
const debug = debugGenerator('efate:fixture');
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
export default class Fixture<T = any> {
  private instanceCount: number;
  private builders: Array<string | BuilderReturnFunction>;
  constructor(...fields: Array<string | BuilderReturnFunction>) {
    debug('provided fields %o', fields);

    this.instanceCount = 1;
    this.builders = fields;
  }

  public create(overrides: Partial<T> | OverrideFunction = {}): T {
    const fixture = {} as T;
    this.builders.forEach(builder => {
      debug('builder: %o', builder);
      const field = PropertyBuilder.generateField(builder, this.instanceCount);
      debug('generated field %o', field);
      Object.defineProperty(fixture, field.name, {
        value: field.value,
        enumerable: true,
        writable: true
      });
    });
    applyOverrides(fixture, overrides);
    this.instanceCount++;
    return fixture;
  }
}

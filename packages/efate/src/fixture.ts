
import PropertyBuilder from './property-builders';
import { BuilderReturnFunction } from './types';
import { isObject, isFunction } from './utils';
import * as merge from 'lodash.merge';
import * as debugGenerator from 'debug';
const debug = debugGenerator('efate:fixture');

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};
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
    merge(fixture, overrides)
  }
}
export default class Fixture<T = any> {
  private instanceCount: number;
  private builders: Array<(keyof T) | BuilderReturnFunction>;
  constructor(...fields: Array<(keyof T) | BuilderReturnFunction>) {
    debug('provided fields %o', fields);

    this.instanceCount = 1;
    this.builders = fields;
  }

  public create(overrides: RecursivePartial<T> | OverrideFunction = {}): T {
    const fixture = {} as T;
    this.builders.forEach(builder => {
      debug('builder: %o', builder);
      const field = PropertyBuilder.generateField<T>(builder, this.instanceCount);
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

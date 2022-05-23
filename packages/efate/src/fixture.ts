import { isFunction } from './utils';
import * as merge from 'lodash.merge';
import * as debugGenerator from 'debug';
import {FieldGeneratorFunc, } from "./types";
const debug = debugGenerator('efate:fixture');

type RecursivePartial<T> = { [P in keyof T]?: RecursivePartial<T[P]> };

type OverrideFunction = (fixture: any) => void;

function applyOverrides(fixture: {}, overrides: {}) {
  if (isFunction(overrides)) {
    overrides(fixture);
  } else {
    merge(fixture, overrides);
  }
}

export default class Fixture<T> {
  private instanceCount: number;
  private builders: FieldGeneratorFunc[] = [];
  constructor(builders: FieldGeneratorFunc[]) {
    this.instanceCount = 1;
    this.builders = builders;
  }

  public create(overrides: RecursivePartial<T> | OverrideFunction = {}): T {
    const fixture = {} as T;
    this.builders.forEach((builder) => {
      debug('builder: %o', builder);
      const field = builder(this.instanceCount);
      debug('generated field %o', field);
      Object.defineProperty(fixture, field.name, {
        value: field.value,
        enumerable: true,
        writable: true,
      });
    });
    applyOverrides(fixture, overrides);
    this.instanceCount++;
    return fixture;
  }
}

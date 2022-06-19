import { isFunction } from './utils';
import * as merge from 'lodash.merge';
import * as debugGenerator from 'debug';
import { FieldGeneratorFunc } from './types';
import numberFieldBuilder from './property-builders/number-field-builder';
import type { PartialDeep } from 'type-fest';
const debug = debugGenerator('efate:fixture');

export type OverrideFunction = (fixture: any) => void;

export type Override<T> = PartialDeep<T> | OverrideFunction;

export type ArrayParameterFunction<T> = (
  index: number,
  create: (overrides?: Override<T>) => T,
) => T;

export type CreateArrayParameter<T> =
  | PartialDeep<T>
  | Array<PartialDeep<T>>
  | ArrayParameterFunction<T>;

function applyOverrides<T>(fixture: {}, overrides: Override<T>) {
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

  public create(overrides?: Override<T>): T {
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
    if (overrides) {
      applyOverrides(fixture, overrides);
    }
    this.instanceCount++;
    return fixture;
  }
  public createArrayWith(length: number, params?: CreateArrayParameter<T>): T[] {
    const results: T[] = [];
    for (let i = 0; i < length; i++) {
      if (params) {
        if (isFunction(params)) {
          results.push(params(i, this.create.bind(this)));
        } else if (Array.isArray(params)) {
          if (params[i]) {
            results.push(this.create(params[i]));
          } else {
            results.push(this.create());
          }
        } else {
          results.push(this.create(params));
        }
      } else {
        results.push(this.create());
      }
    }
    return results;
  }
}

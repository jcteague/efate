import debugGenerator from 'debug';
import merge from 'lodash.merge';
import type { PartialDeep } from 'type-fest';

import { BuilderGeneratorFunction } from './types';
import { isFunction } from './utils';

const debug = debugGenerator('efate:fixture-factory');

type OverridesFn<T> = (fixture: T) => void;
type Overrides<T> = PartialDeep<T> | OverridesFn<T>;

type CreateArrayParameterFn<T> = (index: number, create: (overrides?: Overrides<T>) => T) => T;
type CreateArrayParameter<T> = PartialDeep<T> | Array<PartialDeep<T>> | CreateArrayParameterFn<T>;

export default class Fixture<T> {
  private omittedFields: Set<keyof T> = new Set();
  private builders: BuilderGeneratorFunction<T>[] = [];
  private instanceCount: number;

  constructor(builders: BuilderGeneratorFunction<T>[], extendFixture: Array<Fixture<T>>) {
    this.instanceCount = 1;
    this.builders = builders;
    

    if (extendFixture.length > 0) {
      this.builders.push(...extendFixture.map(fixture => fixture.builders).flat());
    }
  }

  public create(overrides?: Overrides<T>): T {
    const fixture = {} as T;

    this.builders.forEach((builder) => {
      debug('builder: %o', builder);

      const field = builder(this.instanceCount);

      if (this.omittedFields.has(field.name as keyof T)) {
        debug('omitting field %s', field.name);
      } else {
        debug('generated field %o', field);
        Object.defineProperty(fixture, field.name, {
          value: field.value,
          enumerable: true,
          writable: true,
        });
      }
    });

    this.omittedFields.clear();
    this.instanceCount++;

    if (overrides) {
      isFunction(overrides) ? overrides(fixture) : merge(fixture, overrides);
    }

    return fixture;
  }

  public createArrayWith(length: number, params?: CreateArrayParameter<T>): T[] {
    const results: T[] = [];

    for (let i = 0; i < length; i++) {
      if (!params) {
        results.push(this.create());
        continue;
      }

      if (isFunction(params)) {
        results.push(params(i, this.create.bind(this)));
        continue;
      }

      if (Array.isArray(params)) {
        results.push(this.create(params[i]));
        continue;
      }

      results.push(this.create(params));
    }

    return results;
  }

  public omit(...fields: [keyof T]) {
    this.omittedFields = new Set(fields);
    return this;
  }
}

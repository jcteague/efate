import debugGenerator from 'debug';
import merge from 'lodash.merge';

import { FixtureFieldBuilder, FixtureOverrider, FixturesArrayBuilder } from './types';
import { isFunction } from './utils';

const debug = debugGenerator('efate:fixture-factory');

export default class Fixture<T> {
  private omittedFields: Set<keyof T> = new Set();
  private builders: FixtureFieldBuilder<T>[] = [];
  private instanceCount: number;

  constructor(builders: FixtureFieldBuilder<T>[], extendFixture?: Fixture<T>) {
    this.instanceCount = 1;
    this.builders = builders;

    if (extendFixture) {
      this.builders.push(...extendFixture.builders);
    }
  }

  public create(overrides?: FixtureOverrider<T>): T {
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

  public createArrayWith(length: number, params?: FixturesArrayBuilder<T>): T[] {
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

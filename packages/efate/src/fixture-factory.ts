import debugGenerator from 'debug';

import Fixture from './fixture';
import { FieldTypeBuilder, fieldTypeBuilder } from './property-builders/field-generator';
import { DefineFixture, DefineFixtureFields, FixtureExtension, FixtureFieldBuilder } from './types';

const debug = debugGenerator('efate:fixture-factory');

export function defineFixtureFactory<TFieldExtension>(...extensions: FixtureExtension[]) {
  return <T>(defineFields: DefineFixture<T, FieldTypeBuilder & TFieldExtension>) => {
    const builders = Object.assign({}, fieldTypeBuilder, ...extensions);
    const buildersList: FixtureFieldBuilder<T>[] = [];

    let extendedFixture: Fixture<T> | undefined;

    const proxy = new Proxy({} as DefineFixtureFields<T, FieldTypeBuilder & TFieldExtension>, {
      get(_, property) {
        if (property === 'extends') {
          debug('extending another fixture');
          return (fixture: Fixture<T>) => {
            extendedFixture = fixture;
          };
        }

        return Object.keys(builders).reduce((obj, key) => {
          const addBuilder = (...args: unknown[]) => {
            buildersList.push(builders[key](property, args));
          };

          obj[key] = addBuilder;
          return obj;
        }, {});
      },
    });

    defineFields(proxy);

    return new Fixture<T>(buildersList, extendedFixture);
  };
}

export function createFixtureFactory<TFieldSelectorExtension>(...extensions: FixtureExtension[]) {
  console.warn(
    'Deprecation Notice! createFixtureFactory has been renamed to defineFixtureFactory. createFixtureFactory function will be removed in future major versions',
  );
  return defineFixtureFactory<TFieldSelectorExtension>(...extensions);
}

export function defineFixture<T>(defineFields: DefineFixture<T, FieldTypeBuilder>) {
  return defineFixtureFactory()(defineFields);
}

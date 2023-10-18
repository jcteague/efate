import debugGenerator from 'debug';

import Fixture from './fixture';
import { fieldTypeGenerators, FieldTypeSelector } from './property-builders/field-generator';
import { BuilderGeneratorFunction } from './types';

const debug = debugGenerator('efate:fixture-factory');

type FixtureFactoryExtensions = Record<string, (...args: any) => BuilderGeneratorFunction<any>>;

type ExtendedFixture = Array<Fixture<any>>;

type ExtendsFixture = {
  extends: (...fixture: Array<Fixture<any>>) => void;
};

type DefineFieldsParam<T, TFieldTypeSelector> = ExtendsFixture & {
  [P in keyof T]: TFieldTypeSelector;
};

type DefineFields<T, TFieldTypeSelector> = (t: DefineFieldsParam<T, TFieldTypeSelector>) => void;

export function defineFixtureFactory<TFieldSelectorExtension>(
  ...extensions: FixtureFactoryExtensions[]
) {
  return <T>(defineFields: DefineFields<T, FieldTypeSelector & TFieldSelectorExtension>) => {
    const builders = Object.assign({}, fieldTypeGenerators, ...extensions);
    const buildersList: BuilderGeneratorFunction<T>[] = [];

    let extendedFixture: ExtendedFixture = [];

    const proxy = new Proxy(
      {} as DefineFieldsParam<T, FieldTypeSelector & TFieldSelectorExtension>,
      {
        get(_, property) {
          if (property === 'extends') {
            debug('extending another fixture');
            return (...fixture: ExtendedFixture) => {
              console.log('extending fixture with', fixture)
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
      },
    );

    defineFields(proxy);

    return new Fixture<T>(buildersList, extendedFixture);
  };
}

export function createFixtureFactory<TFieldSelectorExtension>(
  ...extensions: FixtureFactoryExtensions[]
) {
  console.warn(
    'Deprecation Notice! createFixtureFactory has been renamed to defineFixtureFactory. createFixtureFactory function will be removed in future major versions',
  );
  return defineFixtureFactory<TFieldSelectorExtension>(...extensions);
}

export function defineFixture<T>(defineFields: DefineFields<T, FieldTypeSelector>) {
  return defineFixtureFactory()(defineFields);
}

import Field from './field';
import Fixture from './fixture';
import { FieldTypeSelector, fieldTypeGenerators } from './property-builders/field-generator';
import { FieldGeneratorFunc } from './types';
import * as debugGenerator from 'debug';
const debug = debugGenerator('efate:fixture-factory');

interface ExtendsFixture {
  extends: (fixture: Fixture<any>) => void;
}
type MappedFieldTypeSelector<T, TFieldTypeSelector> = {
  [P in keyof T]: TFieldTypeSelector;
};
type DefineFieldsActionParam<T, TFieldTypeSelector> = MappedFieldTypeSelector<
  T,
  TFieldTypeSelector
> &
  ExtendsFixture;

export type DefineFieldsAction<T, TFieldTypeSelector> = (
  t: DefineFieldsActionParam<T, TFieldTypeSelector>,
) => void;
export function createFixtureFactory<TFieldSelectorExtension>(...extensions) {
  // tslint:disable-next-line:no-console
  console.warn(
    'Deprecation Notice! createFixtureFactory has been renamed to defineFixtureFactory.  createFixtureFactory function will be removed in future major versions',
  );
  return defineFixtureFactory<TFieldSelectorExtension>(...extensions);
}

export function defineFixtureFactory<TFieldSelectorExtension>(...extensions) {
  function createFixture<T>(
    defineFields: DefineFieldsAction<T, FieldTypeSelector & TFieldSelectorExtension>,
  ) {
    const extension = Object.assign({}, ...extensions);

    const builders = { ...fieldTypeGenerators, ...extension };

    const buildersList: FieldGeneratorFunc[] = [];
    let extendedFixture;
    const proxy = new Proxy(
      {},
      {
        get(target, property) {
          if (property === 'extends') {
            debug('extending another fixture');
            return (fixture: Fixture<any>) => {
              extendedFixture = fixture;
            };
          }
          const wrappedBuilders = Object.keys(builders).reduce((obj, key) => {
            obj[key] = (...args) => {
              buildersList.push(builders[key](property, args));
            };
            return obj;
          }, {});
          return wrappedBuilders;
        },
      },
    );
    defineFields(
      proxy as { [P in keyof T]: FieldTypeSelector & TFieldSelectorExtension } & ExtendsFixture,
    );
    return new Fixture<T>(buildersList, extendedFixture);
  }
  return createFixture;
}
export function defineFixture<T>(defineFields: DefineFieldsAction<T, FieldTypeSelector>) {
  return defineFixtureFactory()(defineFields);
}

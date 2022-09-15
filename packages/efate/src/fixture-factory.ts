import Field from './field';
import Fixture from './fixture';
import { FieldTypeSelector, fieldTypeGenerators } from './property-builders/field-generator';

export type DefineFieldsAction<T, TFieldTypeSelector> = (t: {
  [P in keyof T]: TFieldTypeSelector;
}) => void;
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
    const extension = extensions.reduce((obj, ext) => {
      Object.keys(ext).forEach((k) => (obj[k] = ext[k]));
      return obj;
    }, {});
    const builders = { ...fieldTypeGenerators, ...extension };
    {
    }
    const buildersList: Array<(increment: number) => Field<any>> = [];
    const proxy = new Proxy(
      {},
      {
        get(target, property) {
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
    defineFields(proxy as { [P in keyof T]: FieldTypeSelector & TFieldSelectorExtension });
    return new Fixture<T>(buildersList);
  }
  return createFixture;
}
export function defineFixture<T>(defineFields: DefineFieldsAction<T, FieldTypeSelector>) {
  return defineFixtureFactory()(defineFields);
}

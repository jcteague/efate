import Field from "./field";
import Fixture from "./fixture";
import {FieldTypeSelector, fieldTypeGenerators} from './property-builders/field-generator'

export type DefineFieldsAction<T, TFieldTypeSelector> = (t: {[P in keyof T]: TFieldTypeSelector}) => void;

export function createFixtureFactory<TFieldSelectorExtension>(extension = {}) {
  function createFixture<T>(defineFields: DefineFieldsAction<T, FieldTypeSelector & TFieldSelectorExtension>){

    const builders = {...fieldTypeGenerators, ...extension};
    const buildersList: Array<(increment: number) => Field<any>> = [];
    const proxy = new Proxy(
      {},
      {
        get(target, property) {
          const wrappedBuilders = Object.keys(builders).reduce((obj, key) =>{
            obj[key] = (...args) => {
              buildersList.push(builders[key](property, args))
            };
            return obj;
          }, {})
          return wrappedBuilders
        },
      },
    );
    defineFields(proxy as { [P in keyof T]: FieldTypeSelector  & TFieldSelectorExtension});
    return new Fixture<T>(buildersList)


  }
  return createFixture;

}
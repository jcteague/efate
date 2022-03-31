
import { isFunction } from './utils';
import * as merge from 'lodash.merge';
import * as debugGenerator from 'debug';
import {DefineFieldAction, FieldTypeBuilder} from "./property-builders/field-generator";
import {fieldTypeSelector} from "./property-builders/field-generator";
import Field from "./field";
const debug = debugGenerator('efate:fixture');

type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

type OverrideFunction = (fixture: any) => void;

function applyOverrides(fixture: {}, overrides: {}) {
  if (isFunction(overrides)) {
    overrides(fixture);
  } else {
    merge(fixture, overrides)
  }
}
type FieldGeneratorFunc = (increment: number) => Field<any>
export default class Fixture<T> {
  private instanceCount: number;
  private builders: FieldGeneratorFunc[] = [];
  constructor(defineFields: DefineFieldAction<T>) {
    const builders = [];
    const proxy = new Proxy({}, {
      get(target, property){
        return fieldTypeSelector(builders, property.toString());
      }
    })
    defineFields(proxy as FieldTypeBuilder<T>)
    this.instanceCount = 1;
    this.builders = builders;
  }

  public create(overrides: RecursivePartial<T> | OverrideFunction = {}): T {
    const fixture = {} as T;
    this.builders.forEach(builder => {
      debug('builder: %o', builder);
      const field = builder(this.instanceCount);
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
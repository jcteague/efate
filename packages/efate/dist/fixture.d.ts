/// <reference path="../src/global.d.ts" />
import { BuilderReturnFunction } from './types';
interface OverrideObject {
    [key: string]: any;
}
declare type OverrideFunction = (fixture: any) => void;
export default class Fixture {
    private instanceCount;
    private builders;
    constructor(...fields: Array<string | BuilderReturnFunction>);
    create(overrides?: OverrideFunction): any;
    create(overrides?: OverrideObject): any;
}
export {};

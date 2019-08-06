import Field from './field';
export interface FieldBuilder {
    buildFixtureProperty(increment: number): any;
}
export interface DateBuilderOptions {
    incrementDay: boolean;
}
export declare type BuilderReturnFunction = (increment: number) => Field;
export interface LoremIpsumOptions {
    minLength: number;
    maxLength: number;
}

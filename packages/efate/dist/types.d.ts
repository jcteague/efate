import Field from './field';
export interface DateBuilderOptions {
    incrementDay: boolean;
}
export declare type BuilderReturnFunction = (increment: number) => Field;
export interface LoremIpsumOptions {
    minLength: number;
    maxLength: number;
}

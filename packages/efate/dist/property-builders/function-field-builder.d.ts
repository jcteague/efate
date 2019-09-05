import { BuilderReturnFunction } from '../types';
declare const buildFromFunction: (this: string, func: (increment: number) => any) => BuilderReturnFunction;
export default buildFromFunction;

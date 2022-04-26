// tslint:disable-next-line

import { Field, FixtureFactory } from 'efate';

import {v4} from 'uuid';
const uuidBuilder = () =>(fieldName: string) => (increment: number) => new Field(fieldName, v4());


export default uuidBuilder;
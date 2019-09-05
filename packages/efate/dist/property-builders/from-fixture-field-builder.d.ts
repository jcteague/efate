import Fixture from '../fixture';
import { BuilderReturnFunction } from '../types';
declare const fromFixtureBuilder: (this: string, fixture: Fixture) => BuilderReturnFunction;
export default fromFixtureBuilder;

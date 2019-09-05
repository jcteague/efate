import * as fs from 'fs';
import {DocumentNode, parse} from 'graphql';
import {buildFixtures} from './build-fixtures';
import {FixtureDefinition} from './types';
import Fixture from "efate";

export interface GraphqlFixtureOptions {
  schemaSrcPath: string
}

export default class GraphqlFixture{
  private fixtures: FixtureDefinition[] = [];
  constructor(options: GraphqlFixtureOptions){
    let schema: DocumentNode;
    if(options.schemaSrcPath){
      const schemaContents = fs.readFileSync(options.schemaSrcPath,{encoding: 'utf8'});

      schema = parse(schemaContents);
      this.fixtures = buildFixtures(schema, {});
    }

  }
}
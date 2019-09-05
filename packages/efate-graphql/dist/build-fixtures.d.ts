import { DocumentNode } from 'graphql';
import { BuildFixtureOptions, FixtureDefinition } from "./types";
export declare function buildFixtures(graphqlDocument: DocumentNode, options: BuildFixtureOptions): FixtureDefinition[];

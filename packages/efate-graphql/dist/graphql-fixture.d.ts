export interface GraphqlFixtureOptions {
    schemaSrcPath: string;
}
export default class GraphqlFixture {
    private fixtures;
    constructor(options: GraphqlFixtureOptions);
}

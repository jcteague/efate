import Fixture, {BuilderReturnFunction} from "efate";

export interface CustomScalarFieldBuilder {
  typeName: string;
  fieldBuilder: () => BuilderReturnFunction;
}

export interface BuildFixtureOptions{
  scalarBuilders?: CustomScalarFieldBuilder[]
}
export interface FixtureDefinition {
  typeName: string;
  typeKind: string;
  fixture: Fixture;
}

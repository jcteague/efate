import {BuilderReturnFunction, DateBuilderOptions} from "../types";
import Field from "../field";
import {attachBuilderToStringProto} from "../utils";
import Fixture from "../fixture";

const fromFixtureBuilder = function(this:string, fixture: Fixture): BuilderReturnFunction {
  const fieldName = this;
  return () => {
    return new Field(fieldName, fixture.create());
  }
};

attachBuilderToStringProto('fromFixture', fromFixtureBuilder);
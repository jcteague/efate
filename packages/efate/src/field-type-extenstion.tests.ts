import Field from "./field";
import {expect} from "chai";
import {createFixtureFactory} from "./fixture-factory";

interface FixtureExtension {
  asSSN(startValue:number): () => void;
}
interface PropertyTypeBuilder {
  asString: () => void;
}
const typeBuilders = {
  asString: (fieldName) => (increment) => new Field(fieldName, `${fieldName}${increment}`),
} ;
const ssnExtension = {
  asSSN: (fieldName: string, [startValue]) => {
    return (increment) => {
      return new Field(fieldName, `123-45-${1000 * startValue + increment}`);
    }
  }
};


interface User{ name: string; ssn: string; }
describe('when extending with new field generators', () => {
    it('should provide the extended build as an option when creating the fixture' ,  () => {
        const createFixture = createFixtureFactory<FixtureExtension>(ssnExtension);
        const userFixture = createFixture<User>((t) => {
          t.ssn.asSSN(2);
          t.name.asString();
        });
        const user = userFixture.create();
      expect(user.ssn).to.eql('123-45-2001')
      expect(user.name).to.eql('name1')
    });
    it('should allow extension to be optional', () => {
      const createFixture = createFixtureFactory();
      const userFixture = createFixture<User>((t) => {
        t.name.asString();
        t.ssn.asString();
      })
      const user = userFixture.create();
      expect(user.name).eql('name1')
      expect(user.ssn).eql('ssn1')
    })
})
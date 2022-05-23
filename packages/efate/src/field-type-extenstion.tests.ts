import Field from "./field";
import {expect} from "chai";
import {createFixtureFactory} from "./fixture-factory";

interface FixtureExtension {
  asSSN(startValue:number): () => void;
}
interface CustomEmailDomainExtension {
  emailWithDomain(domainName: string): () => void;
}
const customEmailExtension  = {
  emailWithDomain: (fieldName: string, domainName: string) => (increment: number) => new Field(fieldName, `email${increment}@${domainName}`),
}

const ssnExtension = {
  asSSN: (fieldName: string, [startValue]) => {
    return (increment) => {
      return new Field(fieldName, `123-45-${1000 * startValue + increment}`);
    }
  }
};


interface User{ name: string; ssn: string; email: string }
describe('when extending with new field generators', () => {
    it('should provide the extended build as an option when creating the fixture' ,  () => {
        const createFixture = createFixtureFactory<FixtureExtension>(ssnExtension);
        const userFixture = createFixture<User>((t) => {
          t.ssn.asSSN(2);
          t.name.asString();
          t.email.asString();
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
        t.email.asString();
      })
      const user = userFixture.create();
      expect(user.name).eql('name1')
      expect(user.ssn).eql('ssn1')
    })
    it('should use all extenstions passed to it', () => {
      const createFixture = createFixtureFactory<CustomEmailDomainExtension & FixtureExtension>(ssnExtension, customEmailExtension);
      const userFixture = createFixture<User>(t => {
        t.ssn.asSSN(2);
        t.email.emailWithDomain('example.com');
      });
      const user = userFixture.create();
      expect(user.email).to.eql('email1@example.com');
    })
})
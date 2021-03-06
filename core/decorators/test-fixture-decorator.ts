import "reflect-metadata";
import { TEST_FIXTURE } from "./_metadata-keys";
import { TestFixture as TestFixtureMetadata } from "../";

export function TestFixture(description?: string) {

  return (constructor: Function) => {

    // create data about the test fixture
    // with the description either being the
    // given string or the class name
    const testFixtureMetadata = new TestFixtureMetadata(description || (<any>constructor).name);

    // attach meta data to the class
    Reflect.defineMetadata(TEST_FIXTURE, testFixtureMetadata, constructor);
  };
}

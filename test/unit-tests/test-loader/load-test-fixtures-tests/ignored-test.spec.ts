import { TestLoader } from "../../../../core/test-loader";
import { FileRequirer } from "../../../../core/file-requirer";
import { Expect, Test, TestCase, SpyOn, FocusTests, METADATA_KEYS } from "../../../../core/alsatian-core";
import "reflect-metadata";

export class IgnoredTestTests {

   @Test()
   public singleUnignoredTest() {

     let fileRequirer = new FileRequirer();

     let testFixtureInstance = {
       "unignoredTest": () => {}
     };
     let unignoredTest = {
       key: "unignoredTest"
     };
     Reflect.defineMetadata(METADATA_KEYS.TESTS, [ unignoredTest ], testFixtureInstance);

     let testFixtureConstructor = () => testFixtureInstance;

     let spy = SpyOn(fileRequirer, "require");
     spy.andStub();
     spy.andReturn(testFixtureConstructor);

     let testLoader = new TestLoader(fileRequirer);

     Expect(testLoader.loadTestFixture("test")[0].tests[0].ignored).toBe(false);
   }

    @Test()
    public singleIgnoredTest() {

      let fileRequirer = new FileRequirer();

      let testFixtureInstance = {
        "ignoredTest": () => {}
      };
      let unignoredTest = {
        key: "ignoredTest"
      };
      Reflect.defineMetadata(METADATA_KEYS.TESTS, [ unignoredTest ], testFixtureInstance);
      Reflect.defineMetadata(METADATA_KEYS.IGNORE, true, testFixtureInstance, "ignoredTest");

      let testFixtureConstructor = () => testFixtureInstance;

      let spy = SpyOn(fileRequirer, "require");
      spy.andStub();
      spy.andReturn(testFixtureConstructor);

      let testLoader = new TestLoader(fileRequirer);

      Expect(testLoader.loadTestFixture("test")[0].tests[0].ignored).toBe(true);
    }

    @TestCase("some reason")
    @TestCase("another reason")
    @TestCase("last one, promise!")
    public singleIgnoredTestWithReason(reason: string) {
      let fileRequirer = new FileRequirer();

      let testFixtureInstance = {
        "ignoredTest": () => {}
      };
      let unignoredTest = {
        key: "ignoredTest"
      };
      Reflect.defineMetadata(METADATA_KEYS.TESTS, [ unignoredTest ], testFixtureInstance);
      Reflect.defineMetadata(METADATA_KEYS.IGNORE, true, testFixtureInstance, "ignoredTest");
      Reflect.defineMetadata(METADATA_KEYS.IGNORE_REASON, reason, testFixtureInstance, "ignoredTest");

      let testFixtureConstructor = () => testFixtureInstance;

      let spy = SpyOn(fileRequirer, "require");
      spy.andStub();
      spy.andReturn(testFixtureConstructor);

      let testLoader = new TestLoader(fileRequirer);

      Expect(testLoader.loadTestFixture("test")[0].tests[0].ignoreReason).toBe(reason);
    }
 }

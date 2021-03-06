import { FunctionSpy } from "../../../../core/spying/function-spy";
import { Expect, Test, TestCase, SpyOn } from "../../../../core/alsatian-core";

export class CallTests {

   @TestCase([])
   @TestCase([ 1 ])
   @TestCase([ 1, 2 ])
   @TestCase([ "one", 2 ])
   @TestCase([ { "some": "thing" }, [] ])
   public argumentsRecorded(args: Array<any>) {
      let object = {
         originalFunction: () => {}
      };

      let spy = new FunctionSpy();

      spy.call.apply(spy, args);

      Expect(spy.calls[0].args).toEqual(args);
   }

   @TestCase(0)
   @TestCase(1)
   @TestCase(42)
   public callAddedForEachCall(callCount: number) {
      let object = {
         originalFunction: () => {}
      };

      let spy = new FunctionSpy();

      for (let i = 0; i < callCount; i++) {
         spy.call.apply(spy, []);
      }

      Expect(spy.calls.length).toBe(callCount);
   }

   @TestCase(undefined)
   @TestCase(null)
   @TestCase(0)
   @TestCase(42)
   @TestCase(4.2)
   @TestCase(-4.2)
   @TestCase("")
   @TestCase("something")
   public givenReturnValueIsReturned(expectedReturnValue: any) {
      let object = {
         originalFunction: () => {}
      };

      SpyOn(object, "originalFunction");

      let originalFunction = object.originalFunction;

      let spy = new FunctionSpy();

      spy.andReturn(expectedReturnValue);

      let actualReturnValue = spy.call.apply(spy, []);

      Expect(actualReturnValue).toBe(expectedReturnValue);
   }
}

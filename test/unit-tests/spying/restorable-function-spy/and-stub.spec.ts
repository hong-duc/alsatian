import { RestorableFunctionSpy } from "../../../../core/spying/restorable-function-spy";
import { Expect, Test, TestCase, SpyOn } from "../../../../core/alsatian-core";

export class AndStubTests {

   @Test()
   public originalFunctionNotCalledIfSpyStub() {
      let object = {
         originalFunction: () => {}
      };

      SpyOn(object, "originalFunction");

      let originalFunction = object.originalFunction;

      let spy = new RestorableFunctionSpy(object, "originalFunction");

      spy.andStub();

      spy.call([]);

      Expect(originalFunction).not.toHaveBeenCalled();
   }

   @Test()
   public originalFunctionNotCalledIfSpyNotStubbed() {
      let object = {
         originalFunction: () => {}
      };

      SpyOn(object, "originalFunction");

      let originalFunction = object.originalFunction;

      let spy = new RestorableFunctionSpy(object, "originalFunction");

      spy.call([]);

      Expect(originalFunction).toHaveBeenCalled();
   }
}

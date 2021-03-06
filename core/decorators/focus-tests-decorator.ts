import "reflect-metadata";
import { FOCUS } from "./_metadata-keys";

export function FocusTests(constructor: Function) {

    // mark test class as focussed
    Reflect.defineMetadata(FOCUS, true, constructor);
};

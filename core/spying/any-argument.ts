import { TypeMatcher } from "../spying";

export function Any(type: new (...args: Array<any>) => Object): TypeMatcher {
   return new TypeMatcher(type);
}

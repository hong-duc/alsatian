import { MatchError } from "./match-error";

export class ExactMatchError extends MatchError {

  public constructor(actualValue: any, expectedValue: any, shouldMatch: boolean) {
    super(actualValue, expectedValue, `Expected ${actualValue} ${!shouldMatch ? "not ": ""}to be ${expectedValue}.`);
  }
}
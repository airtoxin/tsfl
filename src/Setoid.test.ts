import { Setoid } from "./Setoid";
import { testReflexivitySpec, testSymmetrySpec, testTransitivitySpec } from "./specs/Setoid";
import { iterLimit, slidingWindow } from "../test/utils";

type Result = {
  num: number;
};

class ResultSetoid implements Setoid {
  constructor(private result: Result) {}

  equals(a: this): boolean {
    return this.result.num === a.result.num;
  }

}

function* setoids(): IterableIterator<ResultSetoid> {
  while (1) {
    yield new ResultSetoid({ num: Math.floor(Math.random() * 5) });
  }
}

describe("Setoid", () => {
  test("Reflexivity 1000 times", () => {
    for (const a of iterLimit(setoids(), 1000)) {
      testReflexivitySpec(a);
    }
  });

  test("Symmetry 1000 times", () => {
    for (const [a, b] of iterLimit(slidingWindow(setoids(), 2), 1000)) {
      testSymmetrySpec(a, b);
    }
  });

  test("Transitivity 1000 times", () => {
    for (const [a, b, c] of iterLimit(slidingWindow(setoids(), 3), 1000)) {
      testTransitivitySpec(a, b, c);
    }
  });
});

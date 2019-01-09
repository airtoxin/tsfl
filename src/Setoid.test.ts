import { Setoid } from "./Setoid";
import {
  testReflexivitySpec,
  testSymmetrySpec,
  testTransitivitySpec
} from "./SetoidSpec";
import { iterLimit, slidingWindow } from "../test/utils";

class Result implements Setoid {
  constructor(private num: number) {}

  equals(a: this): boolean {
    return this.num === a.num;
  }
}

function* setoids(): IterableIterator<Result> {
  while (1) {
    yield new Result(Math.floor(Math.random() * 5));
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

import { Ord } from "./Ord";
import {
  testTotalitySpec,
  testAntisymmetrySpec,
  testTransitivitySpec
} from "./OrdSpec";
import { iterLimit, slidingWindow } from "../test/utils";

class Result implements Ord {
  constructor(private num: number) {}

  equals(a: this): boolean {
    return this.num === a.num;
  }

  lte(a: this): boolean {
    return this.num <= a.num;
  }
}

function* ords(): IterableIterator<Result> {
  while (1) {
    yield new Result(Math.floor(Math.random() * 5));
  }
}

describe("Ord", () => {
  test("Totality 1000 times", () => {
    for (const [a, b] of iterLimit(slidingWindow(ords(), 2), 1000)) {
      testTotalitySpec(a, b);
    }
  });

  test("Antisymmetry 1000 times", () => {
    for (const [a, b] of iterLimit(slidingWindow(ords(), 2), 1000)) {
      testAntisymmetrySpec(a, b);
    }
  });

  test("Transitivity 1000 times", () => {
    for (const [a, b, c] of iterLimit(slidingWindow(ords(), 3), 1000)) {
      testTransitivitySpec(a, b, c);
    }
  });
});

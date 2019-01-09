import { Setoid } from "../Setoid";
import { assertOk, slidingWindow } from "../../test/utils";

const assert = assertOk("Setoid");

export const testReflexivitySpec = (a: Setoid): void => {
  assert(
    "reflexivity",
    a.equals(a)
  );
} ;

export const testSymmetrySpec = (a: Setoid, b: Setoid): void => {
  assert(
    "symmetry",
    a.equals(b) === b.equals(a)
  );
};

export const testTransitivitySpec = (a: Setoid, b: Setoid, c: Setoid): void => {
  if (a.equals(b) && b.equals(c)) {
    assert(
      "transitivity",
      a.equals(c)
    );
  }
};

export const testSetoidSpec = <S extends Setoid>(iter: IterableIterator<S>): void => {
  let count = 0;

  for (const [a, b, c] of slidingWindow(iter, 3)) {
    if (count >= 1000) break;

    testReflexivitySpec(a);
    testSymmetrySpec(a, b);
    testTransitivitySpec(a, b, c);

    count += 1;
  }
};

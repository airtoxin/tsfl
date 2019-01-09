import { assertOk } from "../test/utils";
import { Ord } from "./Ord";

const assert = assertOk("Ord");

export const testTotalitySpec = <O extends Ord>(a: O, b: O): void => {
  assert("Totality", a.lte(b) || b.lte(a));
};

export const testAntisymmetrySpec = <O extends Ord>(a: O, b: O): void => {
  if (a.lte(b) && b.lte(a)) {
    assert("Antisymmetry", a.equals(b));
  }
};

export const testTransitivitySpec = <O extends Ord>(a: O, b: O, c: O): void => {
  if (a.lte(b) && b.lte(c)) {
    assert("Transitivity", a.lte(c));
  }
};

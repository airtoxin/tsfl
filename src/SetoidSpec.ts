import { Setoid } from "./Setoid";
import { assertOk } from "../test/utils";

const assert = assertOk("Setoid");

export const testReflexivitySpec = <S extends Setoid>(a: S): void => {
  assert("reflexivity", a.equals(a));
};

export const testSymmetrySpec = <S extends Setoid>(a: S, b: S): void => {
  assert("symmetry", a.equals(b) === b.equals(a));
};

export const testTransitivitySpec = <S extends Setoid>(
  a: S,
  b: S,
  c: S
): void => {
  if (a.equals(b) && b.equals(c)) {
    assert("transitivity", a.equals(c));
  }
};

import { Setoid } from "./Setoid";
import { testSetoidSpec } from "./specs/Setoid";

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
    yield new ResultSetoid({ num: Math.floor(Math.random() * 10) });
  }
}

testSetoidSpec(setoids());

export const assertOk = (type: string) => (test: string, result: boolean): void => {
  if (!result) throw new Error(`Assert in ${type}: ${test}`);
};

export function* slidingWindow<G>(iter: IterableIterator<G>, windowSize: number): IterableIterator<G[]> {
  const pool: G[] = [];

  for (const g of iter) {
    pool.push(g);
    if (pool.length > windowSize) pool.shift();
    if (pool.length === windowSize) yield pool;
  }
}

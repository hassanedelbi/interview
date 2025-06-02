export const heavyComputation = (limit: number = 30000): number[] => {
  const results: number[] = [];

  for (let i = 0; i < limit; i++) {
    let sum = 0;
    for (let j = 0; j < limit; j++) {
      sum += i * j;
    }
    results.push(sum);
  }

  return results;
};

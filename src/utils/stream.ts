export async function* streamAsync<T>(
  items: T[],
  batchSize: number = 10
): AsyncGenerator<T[]> {
  for (let i = 0; i < items.length; i += batchSize) {
    yield items.slice(i, i + batchSize);
  }
}

export async function streamReduce<T, R>(
  stream: AsyncGenerator<T[]>,
  reducer: (acc: R, item: T) => R,
  initialValue: R
): Promise<R> {
  let acc = initialValue;
  for await (const batch of stream) {
    for (const item of batch) {
      acc = reducer(acc, item);
    }
  }
  return acc;
}


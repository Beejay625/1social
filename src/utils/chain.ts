export function chainFunctions<T>(...functions: Array<(value: T) => T>): (value: T) => T {
  return (value: T) => functions.reduce((acc, fn) => fn(acc), value);
}

export function pipe<T>(value: T, ...functions: Array<(value: T) => T>): T {
  return chainFunctions(...functions)(value);
}



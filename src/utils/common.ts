export const nonNullable = <T>(value: T): value is NonNullable<T> =>
  value != null

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))
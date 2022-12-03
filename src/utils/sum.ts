export function sum(numbers: number[]): number
export function sum<T>(items: T[], selector: (item: T) => number): number
export function sum<T>(
  items: T[] | number[],
  selector?: (item: T) => number
): number {
  let numbers: number[]

  if (selector) {
    numbers = (items as T[]).map((item) => selector(item))
  } else {
    numbers = items as number[]
  }

  return numbers.reduce((sum, cur) => sum + cur, 0)
}

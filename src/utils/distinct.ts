export function distinct<T>(items: T[]): T
export function distinct<T, TKey>(items: T[], selector: (item: T) => TKey): []
export function distinct<T, TKey = T>(
  items: T[],
  selector?: (item: T) => TKey
): T[] {
  const keys = new Set<T | TKey>()
  const results: T[] = []

  if (selector) {
    for (const item of items) {
      const key = selector(item)
      if (!keys.has(key)) {
        keys.add(key)
        results.push(item)
      }
    }
  } else {
    for (const item of items) {
      if (!keys.has(item)) {
        keys.add(item)
        results.push(item)
      }
    }
  }

  return results
}

export function distinctBy<T>(
  items: T[],
  areEqual: (item1: T, item2: T) => boolean
): T[] {
  const results: T[] = []

  for (const item of items) {
    if (!results.some((item2) => areEqual(item, item2))) {
      results.push(item)
    }
  }

  return results
}

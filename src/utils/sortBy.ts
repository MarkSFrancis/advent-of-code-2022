/**
 * Creates a copy of a collection of items, sorts it, and returns the sorted copy. Does not manipulate the original arrage
 * @param items The items to sort
 * @param keySelector The key selector for the value to sort by
 * @param order Whether to sort in ascending or descending order
 */
export const sortBy = <T, TKey extends number | string>(
  items: T[],
  keySelector: (item: T) => TKey,
  order: 'asc' | 'desc' = 'asc'
) => {
  const sorted = items
    .map((i) => ({
      value: i,
      key: keySelector(i),
    }))
    .sort((a, b) => {
      if (b.key === a.key) {
        return 0
      }

      if (order === 'desc') {
        return a.key < b.key ? 1 : -1
      } else {
        return b.key < a.key ? 1 : -1
      }
    })
    .map((i) => i.value)

  return sorted
}

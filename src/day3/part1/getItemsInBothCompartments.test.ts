import { getItemsInBothCompartments } from './getItemsInBothCompartments'

it('should get items in both', () => {
  const duplicates = getItemsInBothCompartments({
    compartments: [
      ['a', 'b', 'c'],
      ['a', 'A', 'B'],
    ],
  })

  expect(duplicates).toEqual(['a'])
})

it('should not double count items that appear twice in first but once in second', () => {
  const duplicates = getItemsInBothCompartments({
    compartments: [
      ['a', 'a', 'c'],
      ['a', 'A', 'B'],
    ],
  })

  expect(duplicates).toEqual(['a'])
})

it('should only count items that appear twice in both as one', () => {
  const duplicates = getItemsInBothCompartments({
    compartments: [
      ['a', 'a', 'c'],
      ['a', 'a', 'B'],
    ],
  })

  expect(duplicates).toEqual(['a'])
})

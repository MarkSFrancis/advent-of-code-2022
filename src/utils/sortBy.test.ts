import { sortBy } from './sortBy'

it('should sort asc by default', () => {
  const sorted = sortBy([1, 5, 3, 2], (i) => i)

  expect(sorted).toEqual([1, 2, 3, 5])
})

it('should sort desc when specified', () => {
  const sorted = sortBy([1, 5, 3, 2], (i) => i, 'desc')

  expect(sorted).toEqual([5, 3, 2, 1])
})

it('should only evaluate sort keys once per item', () => {
  const fn = jest.fn((i) => i)
  const sorted = sortBy([1, 5, 3, 2], fn)

  expect(sorted).toEqual([1, 2, 3, 5])
  expect(fn).toHaveBeenCalledTimes(4)
})

it('should use key selector for sorting', () => {
  const sorted = sortBy([{ val: 1 }, { val: 5 }, { val: 3 }], (i) => i.val)

  expect(sorted).toEqual([{ val: 1 }, { val: 3 }, { val: 5 }])
})

import { sectionIntersects } from './sectionIntersects'

it('should return `false` if it starts and ends before the other starts', () => {
  const result = sectionIntersects(
    {
      start: 0,
      end: 5,
    },
    {
      start: 6,
      end: 10,
    }
  )

  expect(result).toBeFalsy()
})

it('should return `false` if it starts and ends after the other ends', () => {
  const result = sectionIntersects(
    {
      start: 6,
      end: 10,
    },
    {
      start: 0,
      end: 5,
    }
  )

  expect(result).toBeFalsy()
})

it('should return `true` if it wraps the other', () => {
  const result = sectionIntersects(
    {
      start: 0,
      end: 3,
    },
    {
      start: 1,
      end: 2,
    }
  )

  expect(result).toBeTruthy()
})

it('should return `true` if it is wrapped by the other', () => {
  const result = sectionIntersects(
    {
      start: 1,
      end: 2,
    },
    {
      start: 0,
      end: 3,
    }
  )

  expect(result).toBeTruthy()
})

it('should return `true` if it overlaps the start of the other', () => {
  const result = sectionIntersects(
    {
      start: 0,
      end: 2,
    },
    {
      start: 1,
      end: 3,
    }
  )

  expect(result).toBeTruthy()
})

it('should return `true` if it overlaps the end of the other', () => {
  const result = sectionIntersects(
    {
      start: 1,
      end: 3,
    },
    {
      start: 0,
      end: 2,
    }
  )

  expect(result).toBeTruthy()
})

it('should return `true` if it ends at the start of the other', () => {
  const result = sectionIntersects(
    {
      start: 0,
      end: 1,
    },
    {
      start: 1,
      end: 2,
    }
  )

  expect(result).toBeTruthy()
})

it('should return `true` if it starts at the end of the other', () => {
  const result = sectionIntersects(
    {
      start: 1,
      end: 2,
    },
    {
      start: 0,
      end: 1,
    }
  )

  expect(result).toBeTruthy()
})

it('should return `true` if they are identical', () => {
  const result = sectionIntersects(
    {
      start: 0,
      end: 1,
    },
    {
      start: 0,
      end: 1,
    }
  )

  expect(result).toBeTruthy()
})

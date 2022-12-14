import { parseReserviorWall, ReserviorWall } from './parseReserviorWall'

it('should read a path between two points', () => {
  const result = parseReserviorWall('498,4 -> 498,6')

  expect(result).toEqual<ReserviorWall>({
    rockCoordinates: [
      {
        x: 498,
        y: 4,
      },
      {
        x: 498,
        y: 5,
      },
      {
        x: 498,
        y: 6,
      },
    ],
    sandCoordinates: [],
  })
})

it('should read a path between three points', () => {
  const result = parseReserviorWall('498,4 -> 498,6 -> 496,6')

  expect(result).toEqual<ReserviorWall>({
    rockCoordinates: [
      {
        x: 498,
        y: 4,
      },
      {
        x: 498,
        y: 5,
      },
      {
        x: 498,
        y: 6,
      },
      {
        x: 496,
        y: 6,
      },
      {
        x: 497,
        y: 6,
      },
    ],
    sandCoordinates: [],
  })
})

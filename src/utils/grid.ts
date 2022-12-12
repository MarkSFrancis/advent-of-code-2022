import { CoordinatesValue } from './coordinates'

export const getGridLength = <T>(grid: T[][]) => {
  const length = grid.reduce((sum, r) => sum + r.length, 0)

  return length
}

export const gridToCoordinates = <T>(grid: T[][]) => {
  const coords = grid.reduce<CoordinatesValue<T>[]>((coords, row, y) => {
    row.forEach((value, x) => {
      coords.push({
        x,
        y,
        value,
      })
    })

    return coords
  }, [])

  return coords
}

import { Coordinates, CoordinatesValue } from '../utils/coordinates'

export const getHeightmapCoordinate = (
  grid: number[][],
  coordinates: Coordinates
): CoordinatesValue<number> => {
  return {
    ...coordinates,
    value: grid[coordinates.y][coordinates.x],
  }
}

export const getRelativeHeightmapCoordinate = (
  grid: number[][],
  coordinates: Coordinates,
  relativeDirection: 'above' | 'right' | 'below' | 'left'
): CoordinatesValue<number> => {
  const newCoordinates = {
    ...coordinates,
  }

  if (relativeDirection === 'above') {
    newCoordinates.y--
  } else if (relativeDirection === 'right') {
    newCoordinates.x++
  } else if (relativeDirection === 'below') {
    newCoordinates.y++
  } else {
    newCoordinates.x--
  }

  return {
    ...newCoordinates,
    value: grid[newCoordinates.y]?.[newCoordinates.x],
  }
}

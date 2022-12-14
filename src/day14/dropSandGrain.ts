import { Coordinates } from '../utils/coordinates'
import { ReserviorWall } from './parseReserviorWall'

export const SAND_START_COORDINATES: Coordinates = {
  x: 500,
  y: 0,
}

export const dropSandGrain = (wall: ReserviorWall): Coordinates | undefined => {
  const lowestRock = Math.max(...wall.rockCoordinates.map((c) => c.y))

  let fallingSand: FallingSand = {
    coords: SAND_START_COORDINATES,
    direction: undefined,
  }

  while (fallingSand.coords.y < lowestRock) {
    const newLocation = tryStepSandDownOne(wall, fallingSand)
    // Sand has settled
    if (!newLocation) {
      return fallingSand.coords
    }

    fallingSand = newLocation
  }

  // Sand has fallen off to the depths
  return undefined
}

interface FallingSand {
  coords: Coordinates
  direction: 'left' | 'right' | undefined
}

const tryStepSandDownOne = (
  wall: ReserviorWall,
  fallingSand: FallingSand
): FallingSand | undefined => {
  let coords: Coordinates = {
    x: fallingSand.coords.x,
    y: fallingSand.coords.y + 1,
  }
  if (!getIfCoordinatesOccupied(wall, coords)) {
    return {
      coords,
      direction: fallingSand.direction,
    }
  }

  if (fallingSand.direction !== 'right')
    coords = { x: fallingSand.coords.x - 1, y: fallingSand.coords.y + 1 }
  if (!getIfCoordinatesOccupied(wall, coords)) {
    return {
      coords,
      direction: 'left',
    }
  }

  if (fallingSand.direction !== 'left') {
    coords = { x: fallingSand.coords.x + 1, y: fallingSand.coords.y + 1 }
    if (!getIfCoordinatesOccupied(wall, coords)) {
      return {
        coords,
        direction: 'right',
      }
    }
  }

  return undefined
}

const getIfCoordinatesOccupied = (
  wall: ReserviorWall,
  coordinates: Coordinates
) => {
  if (
    wall.rockCoordinates.find(
      (c) => c.x === coordinates.x && c.y === coordinates.y
    )
  ) {
    return true
  }
  if (
    wall.sandCoordinates.find(
      (c) => c.x === coordinates.x && c.y === coordinates.y
    )
  ) {
    return true
  }

  return false
}

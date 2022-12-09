import { Coordinates } from '../utils/coordinates'
import { RopeWalkingMoveDirection } from './parseWalkingMoves'

export interface Locations {
  tail: Coordinates
  head: Coordinates
}

export const executeMoveStep = (
  locations: Locations,
  moveDirection: RopeWalkingMoveDirection
) => {
  const head = getNewHeadCoordinates(locations.head, moveDirection)
  const tail = moveTailToFollowHead({
    head,
    tail: locations.tail,
  })

  return {
    head,
    tail,
  }
}

const getNewHeadCoordinates = (
  { x, y }: Coordinates,
  direction: RopeWalkingMoveDirection
): Coordinates => {
  switch (direction) {
    case RopeWalkingMoveDirection.Up:
      return {
        x,
        y: y + 1,
      }
    case RopeWalkingMoveDirection.Right:
      return {
        x: x + 1,
        y,
      }
    case RopeWalkingMoveDirection.Down:
      return {
        x,
        y: y - 1,
      }
    case RopeWalkingMoveDirection.Left:
      return {
        x: x - 1,
        y,
      }
  }
}

const moveTailToFollowHead = (locations: Locations): Coordinates => {
  const xDiff = locations.head.x - locations.tail.x
  const yDiff = locations.head.y - locations.tail.y

  let yChange = 0
  let xChange = 0
  if (Math.abs(xDiff) > 1) {
    // Narrow the gap
    xChange = xDiff > 0 ? 1 : -1

    if (yDiff !== 0) {
      // Move diagonally
      yChange = yDiff > 0 ? 1 : -1
    }
  } else if (Math.abs(yDiff) > 1) {
    // Narrow the gap
    yChange = yDiff > 0 ? 1 : -1
    if (xDiff !== 0) {
      xChange = xDiff > 0 ? 1 : -1
    }
  }

  return {
    x: locations.tail.x + xChange,
    y: locations.tail.y + yChange,
  }
}

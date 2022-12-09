import { Coordinates } from '../utils/coordinates'
import { RopeWalkingMoveDirection } from './parseWalkingMoves'

export interface Locations {
  tails: Coordinates[]
  head: Coordinates
}

export const executeMoveStep = (
  locations: Locations,
  moveDirection: RopeWalkingMoveDirection
): Locations => {
  const head = getNewHeadCoordinates(locations.head, moveDirection)
  const tails = moveTailsToFollowHead({
    head,
    tails: locations.tails,
  })

  return {
    head,
    tails,
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

const moveTailPartToFollowLeader = (
  leader: Coordinates,
  tailPart: Coordinates
): Coordinates => {
  const xDiff = leader.x - tailPart.x
  const yDiff = leader.y - tailPart.y

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
      // Move diagonally
      xChange = xDiff > 0 ? 1 : -1
    }
  }

  return {
    x: tailPart.x + xChange,
    y: tailPart.y + yChange,
  }
}

const moveTailsToFollowHead = (locations: Locations): Coordinates[] => {
  const newTails: Coordinates[] = []

  for (let tailIdx = 0; tailIdx < locations.tails.length; tailIdx++) {
    let newLocation: Coordinates
    if (tailIdx === 0) {
      newLocation = moveTailPartToFollowLeader(
        locations.head,
        locations.tails[0]
      )
    } else {
      newLocation = moveTailPartToFollowLeader(
        newTails[newTails.length - 1],
        locations.tails[tailIdx]
      )
    }

    newTails.push(newLocation)
  }

  return newTails
}

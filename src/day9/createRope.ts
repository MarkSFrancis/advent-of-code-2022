import { Coordinates } from '../utils/coordinates'
import { Locations } from './executeWalkingMove'

export const createRope = (ropeLength: number): Locations => {
  const tails: Coordinates[] = []

  for (let idx = 0; idx < ropeLength; idx++) {
    tails.push({
      x: 0,
      y: 0,
    })
  }

  return {
    head: { x: 0, y: 0 },
    tails,
  }
}

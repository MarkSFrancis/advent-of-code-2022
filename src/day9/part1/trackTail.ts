import { Coordinates } from '../../utils/coordinates'
import { distinctBy } from '../../utils/distinct'
import { executeMoveStep, Locations } from '../executeWalkingMove'
import { RopeWalkingMove } from '../parseWalkingMoves'

export const trackTail = (moves: RopeWalkingMove[]) => {
  let locations: Locations = {
    head: { x: 0, y: 0 },
    tail: { x: 0, y: 0 },
  }

  const placesTailHasBeen: Coordinates[] = []

  for (const move of moves) {
    for (let stepIdx = 0; stepIdx < move.steps; stepIdx++) {
      locations = executeMoveStep(locations, move.direction)

      placesTailHasBeen.push(locations.tail)
    }
  }

  const distinctPlacesTailHasBeen = distinctBy(
    placesTailHasBeen,
    (item1, item2) => item1.x === item2.x && item1.y === item2.y
  )

  return distinctPlacesTailHasBeen
}

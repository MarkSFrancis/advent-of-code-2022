import {
  parseWalkingMoves,
} from '../parseWalkingMoves'
import { readDay9Data } from '../readData'
import { trackTail } from './trackTail'

export const day9Part1 = () => {
  const data = readDay9Data()
  const instructions = parseWalkingMoves(data)

  const coordinates = trackTail(instructions)

  console.log(coordinates.length)
}

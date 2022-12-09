import { createRope } from '../createRope'
import { parseWalkingMoves } from '../parseWalkingMoves'
import { readDay9Data } from '../readData'
import { trackTailEnd } from '../trackTailEnd'

export const day9Part1 = () => {
  const data = readDay9Data()
  const instructions = parseWalkingMoves(data)

  const coordinates = trackTailEnd(instructions, createRope(1))

  console.log(coordinates.length)
}

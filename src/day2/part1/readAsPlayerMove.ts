import { RockPaperScissorsMove } from '../parseRockPaperScissorsData'

export const readAsPlayerMove = (
  _oppositePlays: string,
  rawMove: string
): RockPaperScissorsMove => {
  switch (rawMove) {
    case 'X':
      return RockPaperScissorsMove.Rock
    case 'Y':
      return RockPaperScissorsMove.Paper
    case 'Z':
      return RockPaperScissorsMove.Scissors
    default:
      throw new Error(`Unrecognised move: ${rawMove}`)
  }
}

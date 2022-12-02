import {
  GameOutcome,
  GAME_OPPOSITION_TO_PLAYER_OUTCOME_MAP,
} from '../gameVictoryMap'
import { RockPaperScissorsMove } from '../parseRockPaperScissorsData'

export const readAsGameOutcome = (
  oppositionMove: RockPaperScissorsMove,
  rawOutcome: string
): RockPaperScissorsMove => {
  const map = GAME_OPPOSITION_TO_PLAYER_OUTCOME_MAP[oppositionMove]
  const desiredOutcome = getDesiredOutcome(rawOutcome)

  const moveToMake = Object.entries(map).find(([_move, outcome]) => {
    return outcome === desiredOutcome
  })
  if (!moveToMake) {
    throw new Error("Couldn't find desired move")
  }

  return moveToMake[0] as RockPaperScissorsMove
}

const getDesiredOutcome = (rawOutcome: string) => {
  switch (rawOutcome) {
    case 'X':
      return GameOutcome.OppositionWin
    case 'Y':
      return GameOutcome.Draw
    case 'Z':
      return GameOutcome.PlayerWin
    default:
      throw new Error(`Unrecognised move: ${rawOutcome}`)
  }
}

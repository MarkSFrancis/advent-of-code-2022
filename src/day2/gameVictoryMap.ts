import { RockPaperScissorsMove } from './parseRockPaperScissorsData'

export enum GameOutcome {
  PlayerWin = 'PlayerWin',
  Draw = 'Draw',
  OppositionWin = 'OppositionWin',
}

export const GAME_OPPOSITION_TO_PLAYER_OUTCOME_MAP: Record<
  RockPaperScissorsMove,
  Record<RockPaperScissorsMove, GameOutcome>
> = {
  [RockPaperScissorsMove.Paper]: {
    [RockPaperScissorsMove.Paper]: GameOutcome.Draw,
    [RockPaperScissorsMove.Rock]: GameOutcome.OppositionWin,
    [RockPaperScissorsMove.Scissors]: GameOutcome.PlayerWin,
  },
  [RockPaperScissorsMove.Rock]: {
    [RockPaperScissorsMove.Paper]: GameOutcome.PlayerWin,
    [RockPaperScissorsMove.Rock]: GameOutcome.Draw,
    [RockPaperScissorsMove.Scissors]: GameOutcome.OppositionWin,
  },
  [RockPaperScissorsMove.Scissors]: {
    [RockPaperScissorsMove.Paper]: GameOutcome.OppositionWin,
    [RockPaperScissorsMove.Rock]: GameOutcome.PlayerWin,
    [RockPaperScissorsMove.Scissors]: GameOutcome.Draw,
  },
}

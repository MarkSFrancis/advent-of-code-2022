import {
  GameOutcome,
  GAME_OPPOSITION_TO_PLAYER_OUTCOME_MAP,
} from './gameVictoryMap'
import {
  RockPaperScissorsGame,
  RockPaperScissorsMove,
} from './parseRockPaperScissorsData'

export const getGameScore = (game: RockPaperScissorsGame) => {
  const gameOutcome = getGameOutcome(game)

  const playerMovePoints = getPlayerMovePoints(game.playerPlays)
  const gamePoints = getGameOutcomeScore(gameOutcome)

  return playerMovePoints + gamePoints
}

const getGameOutcome = (game: RockPaperScissorsGame) => {
  return GAME_OPPOSITION_TO_PLAYER_OUTCOME_MAP[game.oppositePlays][
    game.playerPlays
  ]
}

const getPlayerMovePoints = (move: RockPaperScissorsMove) => {
  switch (move) {
    case RockPaperScissorsMove.Rock:
      return 1
    case RockPaperScissorsMove.Paper:
      return 2
    case RockPaperScissorsMove.Scissors:
      return 3
  }
}

const getGameOutcomeScore = (outcome: GameOutcome) => {
  switch (outcome) {
    case GameOutcome.OppositionWin:
      return 0
    case GameOutcome.Draw:
      return 3
    case GameOutcome.PlayerWin:
      return 6
  }
}

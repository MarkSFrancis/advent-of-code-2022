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

enum GameOutcome {
  PlayerWin = 'PlayerWin',
  Draw = 'Draw',
  OppositionWin = 'OppositionWin',
}

const getGameOutcome = (game: RockPaperScissorsGame) => {
  if (game.oppositePlays === game.playerPlays) {
    return GameOutcome.Draw
  }

  switch (game.oppositePlays) {
    case RockPaperScissorsMove.Paper: {
      if (game.playerPlays === RockPaperScissorsMove.Scissors) {
        return GameOutcome.PlayerWin
      } else {
        return GameOutcome.OppositionWin
      }
    }
    case RockPaperScissorsMove.Rock: {
      if (game.playerPlays === RockPaperScissorsMove.Paper) {
        return GameOutcome.PlayerWin
      } else {
        return GameOutcome.OppositionWin
      }
    }
    case RockPaperScissorsMove.Scissors: {
      if (game.playerPlays === RockPaperScissorsMove.Rock) {
        return GameOutcome.PlayerWin
      } else {
        return GameOutcome.OppositionWin
      }
    }
  }
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

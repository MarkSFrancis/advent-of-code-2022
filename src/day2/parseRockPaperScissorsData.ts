export enum RockPaperScissorsMove {
  Rock = 'Rock',
  Paper = 'Paper',
  Scissors = 'Scissors',
}

export interface RockPaperScissorsGame {
  oppositePlays: RockPaperScissorsMove
  playerPlays: RockPaperScissorsMove
}

export const parseRockPaperScissorsData = (rawData: string) => {
  const games = rawData.split('\n')

  return games.map<RockPaperScissorsGame>((g) => {
    const [opposition, player] = g.split(' ')

    return {
      oppositePlays: toOppositionMove(opposition),
      playerPlays: toPlayerMove(player),
    }
  })
}

const toPlayerMove = (rawMove: string): RockPaperScissorsMove => {
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

const toOppositionMove = (rawMove: string): RockPaperScissorsMove => {
  switch (rawMove) {
    case 'A':
      return RockPaperScissorsMove.Rock
    case 'B':
      return RockPaperScissorsMove.Paper
    case 'C':
      return RockPaperScissorsMove.Scissors
    default:
      throw new Error(`Unrecognised move: ${rawMove}`)
  }
}

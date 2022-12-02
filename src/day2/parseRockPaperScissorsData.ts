export enum RockPaperScissorsMove {
  Rock = 'Rock',
  Paper = 'Paper',
  Scissors = 'Scissors',
}

export interface RockPaperScissorsGame {
  oppositePlays: RockPaperScissorsMove
  playerPlays: RockPaperScissorsMove
}

export const parseRockPaperScissorsData = (
  rawData: string,
  getPlayerMove: (
    oppositionMove: RockPaperScissorsMove,
    val: string
  ) => RockPaperScissorsMove
) => {
  const games = rawData.split('\n')

  return games.map<RockPaperScissorsGame>((g) => {
    const [opposition, player] = g.split(' ')
    const oppositePlays = toOppositionMove(opposition)

    return {
      oppositePlays,
      playerPlays: getPlayerMove(oppositePlays, player),
    }
  })
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

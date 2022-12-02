import { getGameScore } from '../getGameScore'
import { parseRockPaperScissorsData } from '../parseRockPaperScissorsData'
import { readDay2Data } from '../readData'
import { readAsGameOutcome } from './readAsPlayerVictory'

export const day2Part2 = () => {
  const data = readDay2Data()

  const games = parseRockPaperScissorsData(data, readAsGameOutcome)

  const scores = games.map((g) => getGameScore(g))

  console.log(scores.reduce((sum, cur) => sum + cur, 0))
}

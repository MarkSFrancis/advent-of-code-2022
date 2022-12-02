import { getGameScore } from '../getGameScore'
import { parseRockPaperScissorsData } from '../parseRockPaperScissorsData'
import { readDay2Data } from '../readData'

export const day2Part1 = () => {
  const data = readDay2Data()

  const games = parseRockPaperScissorsData(data)

  const scores = games.map((g) => getGameScore(g))

  console.log(scores.reduce((sum, cur) => sum + cur, 0))
}

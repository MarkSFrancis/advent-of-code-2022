import { sum } from "../../utils/sum"
import { getGameScore } from '../getGameScore'
import { parseRockPaperScissorsData } from '../parseRockPaperScissorsData'
import { readDay2Data } from '../readData'
import { readAsPlayerMove } from './readAsPlayerMove'

export const day2Part1 = () => {
  const data = readDay2Data()

  const games = parseRockPaperScissorsData(data, readAsPlayerMove)

  const scores = games.map((g) => getGameScore(g))

  console.log(sum(scores))
}

import { getNMaxCalorieElves } from './getNMaxCalorieElves'
import { parseElfCalorieData } from '../parseElfCalorieData'
import { getElfTotalCalories } from '../getElfTotalCalories'
import { readDay1Data } from '../readData'

export const day1Part2 = () => {
  const fileContent = readDay1Data()
  const elves = parseElfCalorieData(fileContent)
  const maxCalorieElves = getNMaxCalorieElves(elves, 3)

  const totalOfMax = getElfTotalCalories(maxCalorieElves)

  console.log(totalOfMax)
}

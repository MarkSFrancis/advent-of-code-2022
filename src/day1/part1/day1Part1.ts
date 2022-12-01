import { getMaxCalorieElf } from './getMaxCalorieElf'
import { parseElfCalorieData } from '../parseElfCalorieData'
import { readDay1Data } from '../readData'

export const day1Part1 = () => {
  const fileContent = readDay1Data()
  const elves = parseElfCalorieData(fileContent)
  const maxCalorieElf = getMaxCalorieElf(elves)

  console.log(maxCalorieElf)
}

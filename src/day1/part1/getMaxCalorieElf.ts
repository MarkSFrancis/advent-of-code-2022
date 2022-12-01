import { getElfTotalCalories } from '../getElfTotalCalories'
import { ElfCalories } from '../parseElfCalorieData'

export const getMaxCalorieElf = (elves: ElfCalories[]) => {
  const maxCalorieElf = elves.reduce<number>((highestElfCalories, curElf) => {
    const curElfCalories = getElfTotalCalories(curElf)

    if (curElfCalories > highestElfCalories) {
      return curElfCalories
    } else {
      return highestElfCalories
    }
  }, 0)

  return maxCalorieElf
}

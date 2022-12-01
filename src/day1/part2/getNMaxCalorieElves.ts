import { getElfTotalCalories } from '../getElfTotalCalories'
import { ElfCalories } from '../parseElfCalorieData'

export const getNMaxCalorieElves = (elves: ElfCalories[], maxN: number) => {
  const calorieElves = elves.map((e) => getElfTotalCalories(e))
  calorieElves.sort((e1, e2) => e1 - e2)

  return calorieElves.slice(-maxN)
}

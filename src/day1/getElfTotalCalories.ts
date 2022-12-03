import { sum } from "../utils/sum"

export type ElfCalories = number[]

export const getElfTotalCalories = (elf: ElfCalories) => {
  return sum(elf)
}

export type ElfCalories = number[]

export const getElfTotalCalories = (elf: ElfCalories) => {
  return elf.reduce((sum, cur) => sum + cur, 0)
}

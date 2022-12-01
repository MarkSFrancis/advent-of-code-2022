export type ElfCalories = number[]

export const parseElfCalorieData = (rawData: string) => {
  const lines = rawData.split('\n')

  const elvesCalories = lines.reduce<ElfCalories[]>((elves, line) => {
    if (line === '') {
      elves.push([])
      return elves
    }
    if (elves.length === 0) {
      elves.push([])
    }

    const currentElf = elves[elves.length - 1]
    currentElf.push(parseFloat(line))
    return elves
  }, [])

  return elvesCalories
}

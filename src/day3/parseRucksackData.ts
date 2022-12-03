export type RucksackCompartment = string[]

export interface RucksackContents {
  compartments: [RucksackCompartment, RucksackCompartment]
}

export const parseRucksackData = (rawData: string) => {
  const rucksacks = rawData.split('\n')

  const parsed = rucksacks.map((r) => toRucksackContents(r))

  return parsed
}

const toRucksackContents = (rawRucksack: string): RucksackContents => {
  const rucksackItems = [...rawRucksack]

  return {
    compartments: [
      rucksackItems.slice(0, rucksackItems.length / 2),
      rucksackItems.slice(rucksackItems.length / 2),
    ],
  }
}

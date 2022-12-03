import { RucksackContents } from '../parseRucksackData'

export const getItemsInBothCompartments = (rucksack: RucksackContents) => {
  const [compartment1, compartment2] = rucksack.compartments

  const duplicates: string[] = []

  for (const item of compartment1) {
    if (duplicates.includes(item)) {
      continue
    }

    const duplicateIndex = compartment2.indexOf(item)

    if (duplicateIndex < 0) {
      continue
    }

    duplicates.push(item)
  }

  return duplicates
}

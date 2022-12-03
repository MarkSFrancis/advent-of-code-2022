import { sum } from '../../utils/sum'
import { getItemPriority } from '../getItemPriority'
import { parseRucksackData } from '../parseRucksackData'
import { readDay3Data } from '../readData'
import { getItemsInBothCompartments } from './getItemsInBothCompartments'

export const day3Part1 = () => {
  const data = readDay3Data()

  const rucksacks = parseRucksackData(data)

  const duplicates = rucksacks.map((r) => getItemsInBothCompartments(r))

  const duplicateSum = sum(duplicates.map((d) => sum(d, getItemPriority)))

  console.log(duplicateSum)
}

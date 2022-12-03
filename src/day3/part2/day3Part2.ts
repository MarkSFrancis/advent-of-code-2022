import { sum } from '../../utils/sum'
import { getItemPriority } from '../getItemPriority'
import { parseRucksackData } from '../parseRucksackData'
import { readDay3Data } from '../readData'
import { getBadgeForGroup } from './getDuplicatesInGroup'
import { splitIntoElfGroups } from './splitIntoElfGroups'

export const day3Part2 = () => {
  const data = readDay3Data()

  const rucksacks = parseRucksackData(data).map((r) => [
    ...r.compartments[0],
    ...r.compartments[1],
  ])

  const badges = splitIntoElfGroups(rucksacks).map((g) => getBadgeForGroup(g))

  const duplicateSum = sum(badges, getItemPriority)

  console.log(duplicateSum)
}

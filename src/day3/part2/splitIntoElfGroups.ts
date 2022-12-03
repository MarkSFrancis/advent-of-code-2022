import { RucksackCompartment } from '../parseRucksackData'

const GROUP_SIZE = 3

export const splitIntoElfGroups = (rucksacks: RucksackCompartment[]) => {
  const groups = rucksacks.reduce<RucksackCompartment[][]>((groups, r) => {
    if (groups.length === 0) {
      groups.push([])
    }
    let lastGroup = groups[groups.length - 1]

    if (lastGroup.length === GROUP_SIZE) {
      lastGroup = []
      groups.push(lastGroup)
    }

    lastGroup.push(r)
    return groups
  }, [])

  return groups
}

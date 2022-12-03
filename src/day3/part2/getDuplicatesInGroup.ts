import { RucksackCompartment } from '../parseRucksackData'

export const getDuplicatesInGroup = (group: RucksackCompartment[]) => {
  if (group.length === 0) {
    return []
  }

  const [elf1, ...otherElves] = group

  const duplicates = elf1.filter((item) => {
    const inAll = otherElves.every((e) => e.includes(item))

    return inAll
  })

  return duplicates
}

export const getBadgeForGroup = (group: RucksackCompartment[]) => {
  const duplicates = getDuplicatesInGroup(group)

  return duplicates[0]
}

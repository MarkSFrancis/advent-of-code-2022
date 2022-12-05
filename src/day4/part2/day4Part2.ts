import { parseSectionData } from '../parseSectionData'
import { readDay4Data } from '../readData'
import { sectionIntersects } from './sectionIntersects'

export const day4Part2 = () => {
  const data = readDay4Data()

  const pairs = parseSectionData(data)

  const intersectingPairs = pairs.filter((p) => {
    return sectionIntersects(p.firstSection, p.secondSection)
  })

  const totalIntersects = intersectingPairs.length

  console.log(totalIntersects)
}

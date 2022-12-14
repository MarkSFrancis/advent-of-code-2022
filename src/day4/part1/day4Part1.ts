import { parseSectionData } from '../parseSectionData'
import { readDay4Data } from '../readData'
import { sectionWraps } from './sectionWraps'

export const day4Part1 = () => {
  const data = readDay4Data()

  const pairs = parseSectionData(data)

  const wrappedPairs = pairs.filter((p) => {
    return (
      sectionWraps(p.firstSection, p.secondSection) ||
      sectionWraps(p.secondSection, p.firstSection)
    )
  })

  const totalWrapped = wrappedPairs.length

  console.log(totalWrapped)
}

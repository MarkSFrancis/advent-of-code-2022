export interface Section {
  start: number
  end: number
}

export interface SectionPair {
  firstSection: Section
  secondSection: Section
}

export const parseSectionData = (rawData: string) => {
  const rawSectionPairs = rawData.split('\n')

  const sectionPairs = rawSectionPairs.map<SectionPair>((pair) => {
    const [firstSection, secondSection] = pair.split(',')

    return {
      firstSection: parseSection(firstSection),
      secondSection: parseSection(secondSection),
    }
  })

  return sectionPairs
}

const parseSection = (rawSection: string): Section => {
  const [start, end] = rawSection.split('-').map((s) => parseFloat(s))

  return {
    start,
    end,
  }
}

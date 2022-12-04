import { Section } from '../parseSectionData'

export const sectionWraps = (section1: Section, section2: Section) => {
  if (section1.start <= section2.start) {
    if (section1.end >= section2.end) {
      return true
    }
  }

  return false
}

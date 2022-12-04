import { Section } from '../parseSectionData'

export const sectionIntersects = (section1: Section, section2: Section) => {
  if (section1.start <= section2.end) {
    if (section1.end >= section2.end) {
      return true
    }
  }
  if (section1.end >= section2.start) {
    if (section1.start <= section2.start) {

      return true
    }
  }
  if (section1.start >= section2.start) {
    if (section1.end <= section2.end) {
      return true
    }
  }

  return false
}

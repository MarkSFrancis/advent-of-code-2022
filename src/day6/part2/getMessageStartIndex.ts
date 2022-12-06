import { getUniqueCharactersBlockIndex } from '../getUniqueCharactersBlockIndex'

export const getMessageStartIndex = (rawData: string) => {
  return getUniqueCharactersBlockIndex(rawData, 14) + 15
}

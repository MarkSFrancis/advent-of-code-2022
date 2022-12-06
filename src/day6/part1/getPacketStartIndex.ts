import { getUniqueCharactersBlockIndex } from '../getUniqueCharactersBlockIndex'

export const getPacketStartIndex = (rawData: string) => {
  return getUniqueCharactersBlockIndex(rawData, 4) + 5
}

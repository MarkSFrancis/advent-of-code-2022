export const getUniqueCharactersBlockIndex = (
  rawData: string,
  blockSize: number
) => {
  const currentBlock: string[] = []

  for (let idx = 0; idx < rawData.length; idx++) {
    const char = rawData[idx]

    if (currentBlock.length === blockSize) {
      currentBlock.shift()
    }

    currentBlock.push(char)

    if (currentBlock.length !== blockSize) {
      continue
    }

    if (
      currentBlock.every((c, cIdx) => currentBlock.indexOf(c) === cIdx)
    ) {
      return idx - blockSize
    }
  }

  // Not found
  return -1
}

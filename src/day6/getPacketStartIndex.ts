export const getPacketStartIndex = (rawData: string) => {
  const last4Characters: string[] = []

  for (let idx = 0; idx < rawData.length; idx++) {
    const char = rawData[idx]

    if (last4Characters.length === 4) {
      last4Characters.shift()
    }

    last4Characters.push(char)

    if (last4Characters.length !== 4) {
      continue
    }

    if (last4Characters.every((c, cIdx) => last4Characters.indexOf(c) === cIdx)) {
      return idx + 1
    }
  }
}

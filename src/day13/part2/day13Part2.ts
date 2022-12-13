import { parseDistressSignal } from '../parseDistressSignal'
import { readDay13Data } from '../readData'
import { findSignalDividers } from './findSignalDividers'

export const day13Part2 = () => {
  const data = readDay13Data()
  const signalPairs = parseDistressSignal(data)
  const dividers = findSignalDividers(signalPairs)
  const key = getDecoderKey(dividers)

  console.log(dividers, key)
}

const getDecoderKey = (dividerIndexes: number[]) => {
  return dividerIndexes.reduce((product, i) => product * (i + 1), 1)
}

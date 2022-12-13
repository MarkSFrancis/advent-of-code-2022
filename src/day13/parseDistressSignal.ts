export interface DistressSignal {
  signalPair: SignalPair
}

export interface SignalPair {
  leftSide: SignalValue
  rightSide: SignalValue
}

export type SignalValue = number | SignalValue[] | undefined

export const parseDistressSignal = (rawData: string) => {
  const signalPairs = rawData
    .split('\n\n')
    .map<SignalPair>((pair) => {
      const [left, right] = pair.split('\n')
      return {
        leftSide: parseSignalValue(left),
        rightSide: parseSignalValue(right),
      }
    })
    .map<DistressSignal>((pair) => ({
      signalPair: pair,
    }))

  return signalPairs
}

const parseSignalValue = (rawValue: string) => {
  const parsed = JSON.parse(rawValue) as SignalValue
  return parsed
}

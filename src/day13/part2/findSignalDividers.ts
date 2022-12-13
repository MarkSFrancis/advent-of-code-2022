import { analyseSignalPairs, AnalysisResult } from '../analyseSignalPairs'
import { DistressSignal, SignalValue } from '../parseDistressSignal'

const dividers = [[[2]], [[6]]]

export const findSignalDividers = (signal: DistressSignal[]) => {
  let signals = signalPairsToSignals(signal)
  signals = sortSignals([...signals, ...dividers])

  const indexes: number[] = []
  for (const divider of dividers) {
    indexes.push(signals.indexOf(divider))
  }

  return indexes
}

const signalPairsToSignals = (pairs: DistressSignal[]) => {
  return pairs.reduce<SignalValue[]>(
    (all, p) => [...all, p.signalPair.leftSide, p.signalPair.rightSide],
    []
  )
}

const sortSignals = (allSignals: SignalValue[]) => {
  allSignals.sort((s1, s2) => {
    const result = analyseSignalPairs({
      leftSide: s1,
      rightSide: s2,
    })

    if (result === AnalysisResult.InOrder) {
      return -1
    } else if (result === AnalysisResult.NotInOrder) {
      return 1
    } else {
      return 0
    }
  })

  return allSignals
}

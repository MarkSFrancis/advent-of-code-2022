import { sum } from "../../utils/sum"
import {
  parseDistressSignal,
} from '../parseDistressSignal'
import { readDay13Data } from '../readData'
import { analysePairs, AnalysisResult } from "./analysePairs"

export const day13Part1 = () => {
  const data = readDay13Data()
  const signals = parseDistressSignal(data)

  const results = signals.map(p => analysePairs(p.signalPair))
  const result = sumIndices(results)
  // const result = analysePairs(signals[1].signalPair)

  console.table(result)
}

const sumIndices = (results: AnalysisResult[]): number => {
  const indices = results.map((r, rIdx) => ({ r, rIdx: rIdx + 1 })).filter(r => r.r === AnalysisResult.InOrder).map(r => r.rIdx)

  return sum(indices)
}

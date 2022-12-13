import { SignalPair, SignalValue } from '../parseDistressSignal'

export enum AnalysisResult {
  InOrder = 'InOrder',
  NotInOrder = 'NotInOrder',
  Indeterminate = 'Indeterminate',
}

export const analysePairs = (pair: SignalPair): AnalysisResult => {
  if (pair.leftSide === undefined) {
    if (pair.rightSide === undefined) {
      return AnalysisResult.Indeterminate
    } else {
      return AnalysisResult.InOrder
    }
  } else if (pair.rightSide === undefined) {
    return AnalysisResult.NotInOrder
  }

  if (isArray(pair.leftSide)) {
    if (isArray(pair.rightSide)) {
      return isRangeInOrder(pair.leftSide, pair.rightSide)
    } else {
      const result = analysePairs({
        leftSide: pair.leftSide[0],
        rightSide: pair.rightSide,
      })

      return result === AnalysisResult.Indeterminate
        ? analysePairs({
            leftSide: pair.leftSide[1],
            rightSide: undefined,
          })
        : result
    }
  } else {
    if (isArray(pair.rightSide)) {
      const result = analysePairs({
        leftSide: pair.leftSide,
        rightSide: pair.rightSide[0],
      })

      return result === AnalysisResult.Indeterminate
        ? analysePairs({
            leftSide: undefined,
            rightSide: pair.rightSide[1],
          })
        : result
    } else {
      if (isInOrder(pair.leftSide, pair.rightSide)) {
        return AnalysisResult.InOrder
      } else if (isNotInOrder(pair.leftSide, pair.rightSide)) {
        return AnalysisResult.NotInOrder
      } else {
        return AnalysisResult.Indeterminate
      }
    }
  }
}

const isRangeInOrder = (left: SignalValue[], right: SignalValue[]) => {
  for (let idx = 0; idx < Math.max(left.length, right.length); idx++) {
    const result = analysePairs({ leftSide: left[idx], rightSide: right[idx] })
    if (result === AnalysisResult.InOrder) {
      return AnalysisResult.InOrder
    } else if (result === AnalysisResult.NotInOrder) {
      return AnalysisResult.NotInOrder
    }
  }

  return AnalysisResult.Indeterminate
}

const isInOrder = (
  leftValue: number | undefined,
  rightValue: number | undefined
) => {
  if (leftValue === undefined) return true
  if (rightValue === undefined) return false

  return leftValue < rightValue
}

const isNotInOrder = (
  leftValue: number | undefined,
  rightValue: number | undefined
) => {
  if (leftValue === undefined) return false
  if (rightValue === undefined) return true

  return leftValue > rightValue
}

const isArray = (value: SignalValue): value is SignalValue[] => {
  return Array.isArray(value)
}

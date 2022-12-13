import { analysePairs, AnalysisResult } from './analysePairs'

it('should say it is in order if the left is lower than the right', () => {
  const result = analysePairs({
    leftSide: 0,
    rightSide: 1,
  })

  expect(result).toEqual(AnalysisResult.InOrder)
})

it('should say it is not in order if the left is higher than the right', () => {
  const result = analysePairs({
    leftSide: 1,
    rightSide: 0,
  })

  expect(result).toEqual(AnalysisResult.NotInOrder)
})

it('should say it is in order if the left is a list with a lower value than the right match', () => {
  const result = analysePairs({
    leftSide: [0],
    rightSide: [1],
  })

  expect(result).toEqual(AnalysisResult.InOrder)
})

it('should say it is not in order if the left is a list with a higher value than the right match', () => {
  const result = analysePairs({
    leftSide: [1],
    rightSide: [0],
  })

  expect(result).toEqual(AnalysisResult.NotInOrder)
})

it('should say it is in order if the left is a shorter list than the right and values match', () => {
  const result = analysePairs({
    leftSide: [],
    rightSide: [0],
  })

  expect(result).toEqual(AnalysisResult.InOrder)
})

it('should say it is not in order if the left is a longer list than the right and values match', () => {
  const result = analysePairs({
    leftSide: [0],
    rightSide: [],
  })

  expect(result).toEqual(AnalysisResult.NotInOrder)
})

it('should say it is not in order if the left is a longer list than the right and values match', () => {
  const result = analysePairs({
    leftSide: [0, 1],
    rightSide: [0],
  })

  expect(result).toEqual(AnalysisResult.NotInOrder)
})

it.only('should say it is in order if the left is a longer wrapping list than the right, but the right nested list is longer', () => {
  const result = analysePairs({
    leftSide: [0, 1],
    rightSide: [[0, 1]],
  })

  expect(result).toEqual(AnalysisResult.InOrder)
})

export type Tree = number

export type ForestGrid = Tree[][]

export const parseForestData = (rawData: string): ForestGrid => {
  const grid = rawData
    .split('\n')
    .map((r) => r.split('').map((tree) => parseFloat(tree)))

  return grid
}

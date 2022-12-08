import { parseForestData } from '../parseForestData'
import { readDay8Data } from '../readData'
import { Coordinates, getViewingScore } from './getViewingScore'

export const day8Part2 = () => {
  const data = readDay8Data()
  const grid = parseForestData(data)

  const treeCordinates = grid.map<Coordinates[]>(
    (r, yIdx) => [...r.map((_, xIdx) => ({ y: yIdx, x: xIdx }))],
    []
  )

  const treeArray = treeCordinates.reduce<Coordinates[]>(
    (trees, r) => [...trees, ...r],
    []
  )

  // const treeScores = treeCordinates.map((r) =>
  //   r.map((t) => ({ h: grid[t.y][t.x], v: getViewingScore(grid, t) }))
  // )

  // console.log(isTreeHidden(grid, treeCordinates[23][20]))

  const treeScores = treeArray.map((t) => getViewingScore(grid, t))

  console.table(Math.max(...treeScores))
}

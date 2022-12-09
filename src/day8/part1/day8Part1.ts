import { Coordinates } from '../../utils/coordinates'
import { parseForestData } from '../parseForestData'
import { readDay8Data } from '../readData'
import { isTreeHidden } from './isTreeHidden'

export const day8Part1 = () => {
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

  const visibleTrees = treeArray.filter((t) => !isTreeHidden(grid, t))

  console.table(visibleTrees.length)
}

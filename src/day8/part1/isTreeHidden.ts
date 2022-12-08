import { ForestGrid, Tree } from '../parseForestData'

export interface Coordinates {
  x: number
  y: number
}

export const isTreeHidden = (
  grid: ForestGrid,
  coordinates: Coordinates
): boolean => {
  const selectedTreeSize = grid[coordinates.y][coordinates.x]

  const treesToLeft = grid[coordinates.y].slice(0, coordinates.x)
  const treesToRight = grid[coordinates.y].slice(coordinates.x + 1)

  const verticalTrees = grid.map((g) => g[coordinates.x])
  const treesToUp = verticalTrees.slice(0, coordinates.y)
  const treesToDown = verticalTrees.slice(coordinates.y + 1)

  if (!hiddenByOtherTrees(selectedTreeSize, treesToLeft)) {
    return false
  } else if (!hiddenByOtherTrees(selectedTreeSize, treesToUp)) {
    return false
  } else if (!hiddenByOtherTrees(selectedTreeSize, treesToRight)) {
    return false
  } else if (!hiddenByOtherTrees(selectedTreeSize, treesToDown)) {
    return false
  }

  return true
}

const hiddenByOtherTrees = (tree: Tree, otherTrees: Tree[]) => {
  return otherTrees.some((t) => t >= tree)
}

import { Coordinates } from "../../utils/coordinates"
import { ForestGrid, Tree } from '../parseForestData'

export const getViewingScore = (
  grid: ForestGrid,
  coordinates: Coordinates
): number => {
  const selectedTree = grid[coordinates.y][coordinates.x]

  const treesToLeft = grid[coordinates.y].slice(0, coordinates.x).reverse()
  const treesToRight = grid[coordinates.y].slice(coordinates.x + 1)

  const verticalTrees = grid.map((g) => g[coordinates.x])
  const treesToUp = verticalTrees.slice(0, coordinates.y).reverse()
  const treesToDown = verticalTrees.slice(coordinates.y + 1)

  const leftScore = getVisibleTreesFromTree(selectedTree, treesToLeft)
  const upScore = getVisibleTreesFromTree(selectedTree, treesToUp)
  const rightScore = getVisibleTreesFromTree(selectedTree, treesToRight)
  const downScore = getVisibleTreesFromTree(selectedTree, treesToDown)

  return leftScore * upScore * rightScore * downScore
}

const getVisibleTreesFromTree = (tree: Tree, otherTrees: Tree[]) => {
  let visibleTreeCount = 0

  for (; visibleTreeCount < otherTrees.length; visibleTreeCount++) {
    if (otherTrees[visibleTreeCount] >= tree) {
      // As far as I can see in this direction
      visibleTreeCount++
      break
    }
  }

  return visibleTreeCount
}

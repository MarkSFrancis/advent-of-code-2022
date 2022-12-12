import { Coordinates } from '../../utils/coordinates'
import {
  CoordinateDistanceMeta,
  generateDijkstrasGrid,
} from '../generateDijkstrasGrid'
import { Heightmap, parseHeightmap } from '../parseHeightmap'
import { readDay12Data } from '../readData'

export const day12Part1 = () => {
  const data = readDay12Data()
  const heightmap = parseHeightmap(data)
  const distances = generateDijkstrasGrid(heightmap)
  const bestPath = drawBestPath(heightmap, distances)

  console.table(bestPath)

  console.log(`Best path total steps: ${distances[heightmap.targetDestination.y][heightmap.targetDestination.x].distanceFromStart}`)
}

const drawBestPath = (
  heightmap: Heightmap,
  distances: CoordinateDistanceMeta[][]
) => {
  const newGrid = heightmap.grid.map((r) => r.map(() => '.'))

  let currentCoords: Coordinates | undefined = heightmap.targetDestination

  while (currentCoords) {
    const currentDistance: CoordinateDistanceMeta =
      distances[currentCoords.y][currentCoords.x]

    newGrid[currentCoords.y][currentCoords.x] =
      currentDistance.distanceFromStart.toString()

    currentCoords = currentDistance.bestPreviousCoordinates
  }

  return newGrid
}

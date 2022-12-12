import { gridToCoordinates } from '../../utils/grid'
import { generateDijkstrasGrid } from '../generateDijkstrasGrid'
import { parseHeightmap } from '../parseHeightmap'
import { readDay12Data } from '../readData'

export const day12Part2 = () => {
  const data = readDay12Data()
  const heightmap = parseHeightmap(data)
  const distancesToDestination: number[] = []

  for (const startPoint of getAll0HeightCoordinates(heightmap.grid)) {
    const distances = generateDijkstrasGrid({
      ...heightmap,
      currentLocation: startPoint,
    })

    console.log(
      `Best path total steps from ${JSON.stringify(startPoint, null, 2)}: ${
        distances[heightmap.targetDestination.y][heightmap.targetDestination.x]
          .distanceFromStart
      }`
    )

    distancesToDestination.push(
      distances[heightmap.targetDestination.y][heightmap.targetDestination.x]
        .distanceFromStart
    )
  }

  console.log(Math.min(...distancesToDestination))
}

const getAll0HeightCoordinates = (grid: number[][]) => {
  return gridToCoordinates(grid).filter((c) => c.value === 0)
}

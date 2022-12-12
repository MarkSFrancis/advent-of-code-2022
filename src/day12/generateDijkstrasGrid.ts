import { Coordinates, CoordinatesValue } from '../utils/coordinates'
import { gridToCoordinates } from '../utils/grid'
import { sortBy } from '../utils/sortBy'
import {
  getHeightmapCoordinate,
  getRelativeHeightmapCoordinate,
} from './getHeightmapCoordinate'
import { Heightmap } from './parseHeightmap'

export interface CoordinateDistanceMeta {
  bestPreviousCoordinates?: Coordinates
  distanceFromStart: number
  visited: boolean
}

export const generateDijkstrasGrid = (grid: Heightmap) => {
  const distancesFromStart: CoordinateDistanceMeta[][] = grid.grid.map((r) =>
    r.map<CoordinateDistanceMeta>((_c) => ({
      bestPreviousCoordinates: undefined,
      distanceFromStart: Infinity,
      visited: false,
    }))
  )

  distancesFromStart[grid.currentLocation.y][
    grid.currentLocation.x
  ].distanceFromStart = 0

  let scanningNode: CoordinatesValue<CoordinateDistanceMeta> = {
    ...grid.currentLocation,
    value: distancesFromStart[grid.currentLocation.y][grid.currentLocation.x],
  }

  while (true) {
    scanningNode.value.visited = true

    const neighbours = getNeighbours(grid.grid, scanningNode)
    for (const neighbour of neighbours) {
      const distanceFromStartViaScanningNode =
        scanningNode.value.distanceFromStart + 1
      const neighbourDistance = distancesFromStart[neighbour.y][neighbour.x]

      if (
        distanceFromStartViaScanningNode < neighbourDistance.distanceFromStart
      ) {
        // New best path found
        distancesFromStart[neighbour.y][neighbour.x] = {
          distanceFromStart: distanceFromStartViaScanningNode,
          visited: neighbourDistance.visited,
          bestPreviousCoordinates: scanningNode,
        }
      }
    }

    const nonVisitedNodes = gridToCoordinates(distancesFromStart)
      .filter((n) => n.value.distanceFromStart !== Infinity)
      .filter((n) => !n.value.visited)

    if (nonVisitedNodes.length === 0) {
      // Explored all nodes
      break
    }

    const nextNodeToVisit = sortBy(
      nonVisitedNodes,
      (n) => distancesFromStart[n.y][n.x].distanceFromStart
    )[0]

    scanningNode = {
      value: nextNodeToVisit.value,
      x: nextNodeToVisit.x,
      y: nextNodeToVisit.y,
    }
  }

  return distancesFromStart
}

const getNeighbours = (grid: number[][], neighboursTo: Coordinates) => {
  const startNode = getHeightmapCoordinate(grid, neighboursTo)

  const neighbours = [
    getRelativeHeightmapCoordinate(grid, neighboursTo, 'above'),
    getRelativeHeightmapCoordinate(grid, neighboursTo, 'right'),
    getRelativeHeightmapCoordinate(grid, neighboursTo, 'below'),
    getRelativeHeightmapCoordinate(grid, neighboursTo, 'left'),
  ]

  const canMoveToNode = (targetNode: CoordinatesValue<number>) => {
    if (targetNode.value === undefined) {
      return false
    }

    const nodeDiff = targetNode.value - startNode.value
    return nodeDiff <= 1
  }

  return neighbours.filter((c) => canMoveToNode(c))
}

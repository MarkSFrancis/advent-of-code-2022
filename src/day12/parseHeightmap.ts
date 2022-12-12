import { Coordinates } from '../utils/coordinates'

export interface Heightmap {
  grid: number[][]
  currentLocation: Coordinates
  targetDestination: Coordinates
}

export const parseHeightmap = (rawData: string): Heightmap => {
  const rawGrid = rawData
    .split('\n')
    .map((r) => r.split(''))

  const heightmap = rawGrid.map((r) =>
    r
      .filter((c) => c !== '\n')
      .map((c) => toHeightLevel(c))
  )

  const { start, end } = findStartAndEnd(rawGrid)

  return {
    grid: heightmap,
    currentLocation: start,
    targetDestination: end,
  }
}

const toHeightLevel = (cell: string) => {
  if (cell === 'S') {
    cell = 'a'
  } else if (cell === 'E') {
    cell = 'z'
  }

  return cell.charCodeAt(0) - 97
}

const findStartAndEnd = (grid: string[][]) => {
  let start: Coordinates | undefined
  let end: Coordinates | undefined

  grid.forEach((r, y) => {
    r.forEach((c, x) => {
      if (c === 'S') {
        start = {
          x,
          y,
        }
      } else if (c === 'E') {
        end = {
          x,
          y,
        }
      }
    })
  })

  if (!start || !end) {
    throw new Error('Could not find start / end')
  }

  return {
    start,
    end,
  }
}

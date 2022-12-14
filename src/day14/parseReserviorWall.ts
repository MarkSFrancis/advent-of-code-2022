import { Coordinates } from '../utils/coordinates'
import { distinctBy } from '../utils/distinct'

export interface ReserviorWall {
  rockCoordinates: Coordinates[]
  sandCoordinates: Coordinates[]
}

export const parseReserviorWall = (rawData: string): ReserviorWall => {
  const rockPaths = rawData
    .split('\n')
    .map<Coordinates[]>((path) => parseRockPath(path))
    .reduce<Coordinates[]>((coords, path) => {
      const newCoords = pathToCoordinates(path)
      return [...coords, ...newCoords]
    }, [])

  const rockCoordinates = distinctBy(
    rockPaths,
    (c1, c2) => c1.x === c2.x && c1.y === c2.y
  )

  return {
    rockCoordinates,
    sandCoordinates: [],
  }
}

const parseRockPath = (rawValue: string) => {
  const rawCoordinates = [...rawValue.matchAll(/\d+,\d+/g)]

  return rawCoordinates.map<Coordinates>((c) => {
    const [[x], [y]] = [...c[0].matchAll(/\d+/g)]

    return {
      x: parseInt(x),
      y: parseInt(y),
    }
  })
}

const pathToCoordinates = (path: Coordinates[]) => {
  if (path.length === 0) {
    return []
  }

  const coords: Coordinates[] = []

  for (let idx = 0; idx < path.length - 1; idx++) {
    coords.push(...lineToCoordinates(path[idx], path[idx + 1]))
  }

  return coords
}

const lineToCoordinates = (
  from: Coordinates,
  to: Coordinates
): Coordinates[] => {
  if (from.x !== to.x && from.y !== to.y) {
    throw new Error('Cannot draw diagonal rock paths')
  }

  const coords: Coordinates[] = []
  if (from.x === to.x) {
    for (
      let yIdx = Math.min(from.y, to.y);
      yIdx <= Math.max(from.y, to.y);
      yIdx++
    ) {
      coords.push({
        x: from.x,
        y: yIdx,
      })
    }
  } else {
    for (
      let xIdx = Math.min(from.x, to.x);
      xIdx <= Math.max(from.x, to.x);
      xIdx++
    ) {
      coords.push({
        x: xIdx,
        y: from.y,
      })
    }
  }

  return coords
}

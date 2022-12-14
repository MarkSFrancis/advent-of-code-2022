export interface Coordinates {
  x: number
  y: number
}

export interface CoordinatesValue<T> extends Coordinates {
  value: T
}

export const logGrid = (
  coordinates: Coordinates[],
  options: Partial<LogGridValuesOptions> = {}
) => {
  logGridValues(
    coordinates.map((c) => ({ ...c, value: '#' })),
    options
  )
}

export interface LogGridValuesOptions {
  missingCoordinateValueText: string
  yOrder: 'asc' | 'desc'
}

export const logGridValues = <T extends string>(
  coordinates: CoordinatesValue<T>[],
  options: Partial<LogGridValuesOptions> = {}
) => {
  const optionsWithDefaults = {
    ...{ missingCoordinateValue: '•', yOrder: 'asc' },
    ...options,
  }

  const maxX = coordinates.reduce((maxX, c) => (c.x > maxX ? c.x : maxX), 0)
  const maxY = coordinates.reduce((maxY, c) => (c.y > maxY ? c.y : maxY), 0)
  const minX = coordinates.reduce(
    (minX, c) => (c.x < minX ? c.x : minX),
    coordinates.length === 0 ? 0 : Infinity
  )
  const minY = coordinates.reduce(
    (minY, c) => (c.y < minY ? c.y : minY),
    coordinates.length === 0 ? 0 : Infinity
  )

  const arr: string[] = []

  for (let yIdx = minY; yIdx <= maxY; yIdx++) {
    let xArr: string = ''

    for (let xIdx = minX; xIdx <= maxX; xIdx++) {
      const firstMatch = coordinates.find((c) => c.x === xIdx && c.y === yIdx)
      if (firstMatch) {
        xArr += firstMatch.value
      } else {
        xArr += optionsWithDefaults.missingCoordinateValue
      }
    }

    arr.push(xArr)
  }

  if (optionsWithDefaults.yOrder === 'asc') {
    arr.reverse()
  }

  console.log(arr.join('\n'))
}

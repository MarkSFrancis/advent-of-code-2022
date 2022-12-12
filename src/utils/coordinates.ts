export interface Coordinates {
  x: number
  y: number
}

export interface CoordinatesValue<T> extends Coordinates {
  value: T
}

export const logGrid = (coordinates: Coordinates[]) => {
  const maxX = coordinates.reduce((maxX, c) => (c.x > maxX ? c.x : maxX), 0)
  const maxY = coordinates.reduce((maxY, c) => (c.y > maxY ? c.y : maxY), 0)
  const minX = coordinates.reduce((minX, c) => (c.x < minX ? c.x : minX), 0)
  const minY = coordinates.reduce((minY, c) => (c.y < minY ? c.y : minY), 0)

  const arr: string[] = []

  for (let yIdx = minY; yIdx <= maxY; yIdx++) {
    let xArr: string = ''

    for (let xIdx = minX; xIdx <= maxX; xIdx++) {
      if (coordinates.some((c) => c.x === xIdx && c.y === yIdx)) {
        xArr += '#'
      } else {
        xArr += '•'
      }
    }

    arr.push(xArr)
  }

  console.log(arr.reverse().join('\n'))
}

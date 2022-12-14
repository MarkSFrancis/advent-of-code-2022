import { logGrid } from '../../utils/coordinates'
import { parseReserviorWall } from '../parseReserviorWall'
import { readDay14Data } from '../readData'

export const day14Part1 = () => {
  const data = readDay14Data()
  const rockStructure = parseReserviorWall(data)

  logGrid(rockStructure.rockCoordinates, { yOrder: 'desc' })
}

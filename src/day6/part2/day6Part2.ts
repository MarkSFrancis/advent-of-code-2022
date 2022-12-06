import { readDay6Data } from '../readData'
import { getMessageStartIndex } from './getMessageStartIndex'

export const day6Part2 = () => {
  const data = readDay6Data()
  const start = getMessageStartIndex(data)

  console.log(start)
}

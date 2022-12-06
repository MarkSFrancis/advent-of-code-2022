import { getPacketStartIndex } from "../getPacketStartIndex"
import { readDay6Data } from "../readData"

export const day6Part1 = () => {
  const data = readDay6Data()
  const start = getPacketStartIndex(data)

  console.log(start)
}

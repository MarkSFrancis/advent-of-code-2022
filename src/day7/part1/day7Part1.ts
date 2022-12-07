import { sum } from '../../utils/sum'
import { foldersToArray } from '../foldersToArray'
import { getFileStructureFromCliOutput } from '../getFileStructureFromCliOutput'
import { getTotalSizeOfDir } from '../getTotalSizeOfDir'
import { parseCommandLineInstructions } from '../parseCliInstructions'
import { readDay7Data } from '../readData'

const LARGE_FOLDER_SIZE = 100_000

export const day7Part1 = () => {
  const data = readDay7Data()
  const instructions = parseCommandLineInstructions(data)
  const fileSystem = getFileStructureFromCliOutput(instructions)
  const largeFolderSizes = foldersToArray(fileSystem)
    .map((f) => getTotalSizeOfDir(f))
    .filter((f) => f <= LARGE_FOLDER_SIZE)

  console.log(sum(largeFolderSizes))
}

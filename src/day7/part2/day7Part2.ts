import { foldersToArray } from '../foldersToArray'
import { getFileStructureFromCliOutput } from '../getFileStructureFromCliOutput'
import { getTotalSizeOfDir } from '../getTotalSizeOfDir'
import { parseCommandLineInstructions } from '../parseCliInstructions'
import { readDay7Data } from '../readData'

const UPDATE_REQUIRED_SPACE = 30000000
const TOTAL_DISK_SPACE = 70000000

export const day7Part2 = () => {
  const data = readDay7Data()
  const instructions = parseCommandLineInstructions(data)
  const fileSystem = getFileStructureFromCliOutput(instructions)

  const totalUsedSpace = getTotalSizeOfDir(fileSystem)
  const currentFreeSpace = TOTAL_DISK_SPACE - totalUsedSpace
  const minimumSpaceNeededToFreeUp = UPDATE_REQUIRED_SPACE - currentFreeSpace

  const folderDeletionCandidatesSizes = foldersToArray(fileSystem)
    .map((f) => getTotalSizeOfDir(f))
    .filter((f) => f >= minimumSpaceNeededToFreeUp)

  const folderToDeleteSize = folderDeletionCandidatesSizes.sort((a, b) => a - b)[0]

  console.log(folderToDeleteSize)
}

import { sum } from '../utils/sum'
import { FsDirectory } from './getFileStructureFromCliOutput'

export const getTotalSizeOfDir = (dir: FsDirectory): number => {
  const childFileSizes = sum(dir.childFiles, (d) => d.sizeBytes)

  const subfolderSizes = sum(dir.childDirectories, (d) => getTotalSizeOfDir(d))

  return childFileSizes + subfolderSizes
}

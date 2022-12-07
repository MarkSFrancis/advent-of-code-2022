import { FsDirectory } from './getFileStructureFromCliOutput'

export const foldersToArray = (root: FsDirectory): FsDirectory[] => {
  return root.childDirectories.reduce<FsDirectory[]>(
    (folders, curDir) => {
      return [...folders, ...foldersToArray(curDir)]
    },
    [root]
  )
}

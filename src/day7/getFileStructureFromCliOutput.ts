import { CommandLineInstruction } from './parseCliInstructions'

export interface FsFile {
  name: string
  sizeBytes: number
}

export interface FsDirectory {
  name: string
  childDirectories: FsDirectory[]
  childFiles: FsFile[]
}

export const getFileStructureFromCliOutput = (
  allCommands: CommandLineInstruction[]
) => {
  const [firstCommand, ...commands] = allCommands
  if (firstCommand.command !== 'cd' || firstCommand.newFolderPath !== '/') {
    throw new Error('Must start from /')
  }

  const rootDir: FsDirectory = {
    childDirectories: [],
    childFiles: [],
    name: '/',
  }

  const dirStructure = commands.reduce<{
    rootDir: FsDirectory
    currentDir: string
  }>(
    (root, command) => {
      if (command.command === 'cd') {
        // Moving to new folder
        if (command.newFolderPath === '..') {
          root.currentDir = navigateUp(root.currentDir)
        } else {
          root.currentDir = navigateTo(
            `${root.currentDir}${command.newFolderPath}`
          )
        }
      } else if (command.command === 'ls') {
        // Reading dir contents
        const currentDir = findDirPath(root.rootDir, root.currentDir)
        currentDir.childFiles.push(
          ...command.childFiles.map<FsFile>((c) => ({
            name: c.filename,
            sizeBytes: c.fileSizeBytes,
          }))
        )
      }

      return root
    },
    {
      rootDir,
      currentDir: '/',
    }
  )

  return dirStructure.rootDir
}

const navigateUp = (dir: string) => {
  const pathSegments = dir.split('/')

  return `${pathSegments.slice(0, pathSegments.length - 2).join('/')}/`
}

const navigateTo = (dir: string) => {
  const newFolder = dir.endsWith('/') ? dir : `${dir}/`

  return newFolder
}

const findDirPath = (root: FsDirectory, dir: string) => {
  if (root.name === dir) {
    return root
  }

  const dirParts = dir.split('/').slice(1, -1)

  const recursiveFindOrCreate = (
    curDir: FsDirectory,
    dirPartIdx: number
  ): FsDirectory => {
    let nextDir = curDir.childDirectories.find(
      (c) => c.name === dirParts[dirPartIdx]
    )

    if (!nextDir) {
      nextDir = {
        name: dirParts[dirPartIdx],
        childDirectories: [],
        childFiles: [],
      }

      curDir.childDirectories.push(nextDir)
    }
    if (dirPartIdx === dirParts.length - 1) {
      return nextDir
    } else {
      return recursiveFindOrCreate(nextDir, dirPartIdx + 1)
    }
  }

  return recursiveFindOrCreate(root, 0)
}

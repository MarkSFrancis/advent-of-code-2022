export type CommandLineInstruction =
  | CommandLineInstructionCd
  | CommandLineInstructionLs

export interface CommandLineInstructionCd {
  command: 'cd'
  newFolderPath: string
}

export interface CommandLineInstructionLs {
  command: 'ls'
  childDirectories: string[]
  childFiles: {
    fileSizeBytes: number
    filename: string
  }[]
}

export const parseCommandLineInstructions = (rawData: string) => {
  const rows = rawData.split('\n')

  return rows.reduce<CommandLineInstruction[]>((commands, row) => {
    const commandPrefix = `$ `

    if (row.startsWith(commandPrefix)) {
      const command = row.slice(commandPrefix.length)

      commands.push(parseCommand(command))
    } else {
      const latestCommand = commands[commands.length - 1]
      if (latestCommand.command !== 'ls') {
        throw new Error(
          `Cannot parse output ${row} for command ${latestCommand.command}`
        )
      }

      parseLsOutput(row, latestCommand)
    }

    return commands
  }, [])
}

const parseCommand = (command: string): CommandLineInstruction => {
  if (command.startsWith('cd ')) {
    return {
      command: 'cd',
      newFolderPath: command.substring('cd '.length),
    }
  } else if (command === 'ls') {
    return {
      command: 'ls',
      childDirectories: [],
      childFiles: [],
    }
  } else {
    throw new Error(`Unrecognised command ${command}`)
  }
}

const parseLsOutput = (
  outputRow: string,
  commandOutputSoFar: CommandLineInstructionLs
) => {
  const dirPrefix = `dir `
  if (outputRow.startsWith(dirPrefix)) {
    // Is child directory
    commandOutputSoFar.childDirectories.push(dirPrefix.slice(dirPrefix.length))
  } else {
    // Is child file
    const fileSize = outputRow.slice(0, outputRow.indexOf(' '))
    const filename = outputRow.slice(fileSize.length + 1)

    commandOutputSoFar.childFiles.push({
      filename,
      fileSizeBytes: parseFloat(fileSize),
    })
  }
}

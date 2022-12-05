import {
  CraneInstruction,
  CraneInstructions,
  CrateStacks,
} from '../parseStacksData'

export const executeCraneInstructions = (
  crates: CrateStacks,
  instructions: CraneInstructions
) => {
  instructions.forEach((i) => executeCraneInstruction(crates, i))

  return crates
}

export const executeCraneInstruction = (
  crates: CrateStacks,
  instruction: CraneInstruction
) => {
  const fromColumn = crates.find((c) => c.stackId === instruction.fromColumnId)
  const toColumn = crates.find((c) => c.stackId === instruction.toColumnId)

  if (!fromColumn || !toColumn) {
    throw new Error(`Invalid instruction. Cannot find column(s)`)
  }

  for (let idx = 0; idx < instruction.totalToMove; idx++) {
    if (fromColumn.crates.length === 0) {
      throw new Error(`Invalid instruction. Column to move from is empty`)
    }

    const movingCrate = fromColumn.crates.pop()
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    toColumn.crates.push(movingCrate!)
  }

  return crates
}

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

  const movingCrates = fromColumn.crates.splice(
    fromColumn.crates.length - instruction.totalToMove
  )

  toColumn.crates.push(...movingCrates)

  return crates
}

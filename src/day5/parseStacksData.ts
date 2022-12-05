export type CrateStacks = CrateStack[]

export interface CrateStack {
  stackId: string
  crates: Crate[]
}

export type Crate = string

export interface CraneInstruction {
  totalToMove: number
  fromColumnId: string
  toColumnId: string
}

export type CraneInstructions = CraneInstruction[]

export const parseSupplyStacksData = (rawData: string) => {
  const [rawStacks, rawInstructions] = rawData.split('\n\n')

  const crateStacks = parseStacks(rawStacks)
  const craneInstructions = parseCraneInstructions(rawInstructions)

  return {
    crateStacks,
    craneInstructions,
  }
}

const parseStacks = (rawStacks: string) => {
  const stackRows = rawStacks.split('\n')

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const allStacks = stackRows
    .splice(stackRows.length - 1, 1)[0]
    .match(/\w+/g)!
    .map<CrateStack>((r) => ({
      crates: [],
      stackId: r,
    }))

  for (const cur of stackRows.reverse()) {
    const columns = getStackRowContentsColumnIndexes(cur)

    for (const crate of columns) {
      allStacks[crate.columnIndex].crates.push(crate.crate)
    }
  }

  return allStacks
}

const getStackRowContentsColumnIndexes = (rawRow: string) => {
  const allMatches = rawRow.matchAll(/\[\w\]/g)

  const allCratesInRow: {
    crate: Crate
    columnIndex: number
  }[] = []

  for (const match of allMatches) {
    allCratesInRow.push({
      crate: match[0].replace('[', '').replace(']', ''),
      columnIndex: (match.index ?? 0) / 4,
    })
  }

  return allCratesInRow
}

const parseCraneInstructions = (rawInstructions: string) => {
  const instructions: CraneInstructions = rawInstructions
    .split('\n')
    .map<CraneInstruction>((r) => {
      // Assumes all column labels are numbers
      const numbers = r.match(/\d+/g)

      if (!numbers || numbers.length !== 3) {
        throw new Error(`Invalid crane instruction found: ${r}`)
      }

      return {
        totalToMove: parseFloat(numbers[0]),
        fromColumnId: numbers[1],
        toColumnId: numbers[2],
      }
    })

  return instructions
}

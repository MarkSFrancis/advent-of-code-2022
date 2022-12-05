import { parseSupplyStacksData } from '../parseStacksData'
import { readDay5Data } from '../readData'
import { executeCraneInstructions } from './executeCraneInstruction'
import { getTopCratesFromStacks } from "./getTopCratesFromStacks"

export const day5Part1 = () => {
  const data = readDay5Data()

  const supplyStacks = parseSupplyStacksData(data)
  const results = executeCraneInstructions(
    supplyStacks.crateStacks,
    supplyStacks.craneInstructions
  )

  console.log(getTopCratesFromStacks(results).join(''))
}

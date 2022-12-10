import { sum } from '../utils/sum'
import { CpuState } from './executeCpuCycle'
import { CpuInstruction } from './parseCpuInstructions'

export const cpuCompletedInstructionSet = (
  cpu: CpuState,
  instructions: CpuInstruction[]
) => {
  const totalCycles = sum(instructions, (i) => i.cycles)

  return cpu.tick >= totalCycles
}

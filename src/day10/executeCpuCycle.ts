import { CpuInstruction, CpuInstructionOp } from './parseCpuInstructions'

export interface CpuState {
  registry: {
    X: number
  }
  tick: number
}

export const executeCpuCycle = (
  cpu: CpuState,
  instructions: CpuInstruction[]
) => {
  if (instructions.length === 0) return

  let tickCursor = 0
  let currentInstruction: CpuInstruction | undefined

  for (const instruction of instructions) {
    if (tickCursor + instruction.cycles >= cpu.tick) {
      currentInstruction = instruction
      break
    }

    tickCursor += instruction.cycles
  }

  if (!currentInstruction) return

  const remainingTicksForInstruction = cpu.tick - tickCursor

  if (remainingTicksForInstruction === 1) {
    switch (currentInstruction.type) {
      case CpuInstructionOp.NoOp:
        break
      case CpuInstructionOp.AddX:
        cpu.registry.X += currentInstruction.valueToAdd
    }
  }

  cpu.tick++
}

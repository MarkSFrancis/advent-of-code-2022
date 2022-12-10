import { cpuCompletedInstructionSet } from '../cpuCompletedInstructionSet'
import { CpuState, executeCpuCycle } from '../executeCpuCycle'
import { parseCpuInstructions } from '../parseCpuInstructions'
import { readDay10Data } from '../readData'
import { getSignalStrength } from './getSignalStrength'

export const day10Part1 = () => {
  const data = readDay10Data()
  const instructions = parseCpuInstructions(data)
  const cpu: CpuState = {
    registry: {
      X: 1,
    },
    tick: 0,
  }

  let totalSignalStrengths = 0
  while (!cpuCompletedInstructionSet(cpu, instructions)) {
    if (isKeyCycle(cpu)) {
      const signalStrength = getSignalStrength(cpu)
      console.log(cpu.tick + 1, signalStrength)

      totalSignalStrengths += signalStrength
    }

    executeCpuCycle(cpu, instructions)
  }

  console.log({ totalSignalStrengths }, cpu)
}

const isKeyCycle = (cpu: CpuState): boolean => {
  return (cpu.tick + 1 - 20) % 40 === 0
}

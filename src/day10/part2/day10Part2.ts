import { cpuCompletedInstructionSet } from '../cpuCompletedInstructionSet'
import { CpuState, executeCpuCycle } from '../executeCpuCycle'
import { parseCpuInstructions } from '../parseCpuInstructions'
import { readDay10Data } from '../readData'
import { Crt, printCrtDisplay, updateCrtDisplay } from './updateCrtDisplay'

export const day10Part2 = () => {
  const data = readDay10Data()
  const instructions = parseCpuInstructions(data)
  const cpu: CpuState = {
    registry: {
      X: 1,
    },
    tick: 0,
  }

  const crt: Crt = []

  while (!cpuCompletedInstructionSet(cpu, instructions)) {
    updateCrtDisplay(cpu, crt)
    executeCpuCycle(cpu, instructions)
  }

  printCrtDisplay(crt)
}

import { CpuState } from '../executeCpuCycle'

export const getSignalStrength = (cpu: CpuState) => {
  return (cpu.tick + 1) * cpu.registry.X
}

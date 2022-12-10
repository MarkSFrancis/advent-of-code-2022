export enum CpuInstructionOp {
  NoOp = 'noop',
  AddX = 'addx',
}

export type CpuInstruction = CpuInstructionNoOp | CpuInstructionAdd

export interface CpuInstructionNoOp {
  type: CpuInstructionOp.NoOp
  cycles: 1
}

export interface CpuInstructionAdd {
  type: CpuInstructionOp.AddX
  valueToAdd: number
  cycles: 2
}

export const parseCpuInstructions = (rawData: string) => {
  return rawData.split('\n').map<CpuInstruction>((r) => {
    if (r.startsWith(CpuInstructionOp.NoOp)) {
      return {
        type: CpuInstructionOp.NoOp,
        cycles: 1,
      }
    } else if (r.startsWith('addx')) {
      return {
        type: CpuInstructionOp.AddX,
        valueToAdd: parseFloat(r.split(' ')[1]),
        cycles: 2,
      }
    } else {
      throw new Error(`Unrecognised CPU instruction: ${r}`)
    }
  })
}

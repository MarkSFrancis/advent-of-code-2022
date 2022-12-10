import { CpuState } from '../executeCpuCycle'

export type Crt = string[]

const SPRITE_X_PADDING = 1

export const updateCrtDisplay = (cpu: CpuState, crt: Crt) => {
  const drawingPixel = cpu.tick
  const drawingPixelX = cpu.tick % 40

  const spriteDrawingDiff = cpu.registry.X - drawingPixelX

  if (Math.abs(spriteDrawingDiff) <= SPRITE_X_PADDING) {
    crt[drawingPixel] = '#'
  } else {
    crt[drawingPixel] = '.'
  }
}

export const printCrtDisplay = (crt: Crt) => {
  const screen = crt
    .reduce<string[]>((rows, pixel, pixelId) => {
      const rowIdx = Math.floor(pixelId / 40)
      rows[rowIdx] = (rows[rowIdx] ?? '') + pixel
      return rows
    }, [])
    .join('\n')

  console.log(screen)
}

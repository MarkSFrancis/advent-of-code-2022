import { readFileSync } from 'fs'
import { join } from 'path'

export const readDay4Data = () => {
  return readFileSync(join(__dirname, 'data.txt'), 'utf-8')
}

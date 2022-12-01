import { readFileSync } from 'fs'
import { join } from 'path'

export const readDay1Data = () => {
  return readFileSync(join(__dirname, 'data.txt'), 'utf-8')
}

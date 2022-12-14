import { executeMonkeyInspection } from '../executeMonkeyInspection'
import { getMonkeyBusinessLevel } from '../getMonkeyBusinessLevel'
import { getLowestCommonMultiple } from '../optimiseOverflow'
import { parseMonkeys } from '../parseMonkeys'
import { readDay11Data } from '../readData'

/**
 * Amount to divide the worry level by after an inspection
 */
const WORRY_LEVEL_RELIEF_DIVISOR = BigInt(3)

export const day11Part1 = () => {
  const data = readDay11Data()
  const monkeys = parseMonkeys(data)
  const lcm = getLowestCommonMultiple(monkeys.map((m) => m.test.divisor))

  const monkeyInspections: number[] = monkeys.map(() => 0)

  for (let roundCount = 0; roundCount < 20; roundCount++) {
    for (let monkeyIdx = 0; monkeyIdx < monkeys.length; monkeyIdx++) {
      while (monkeys[monkeyIdx].itemsHeld.length > 0) {
        monkeyInspections[monkeyIdx]++
        executeMonkeyInspection(
          monkeys,
          monkeyIdx,
          WORRY_LEVEL_RELIEF_DIVISOR,
          lcm
        )
      }
    }
  }

  console.log(
    `Monkey business level: ${getMonkeyBusinessLevel(monkeyInspections)}`
  )
}

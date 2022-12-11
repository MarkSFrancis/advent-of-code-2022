import { executeMonkeyInspection } from '../executeMonkeyRound'
import { parseMonkeys } from '../parseMonkeys'
import { readDay11Data } from '../readData'

export const day11Part1 = () => {
  const data = readDay11Data()
  const monkeys = parseMonkeys(data)

  const monkeyInspections: number[] = monkeys.map((m) => 0)

  for (let roundCount = 0; roundCount < 20; roundCount++) {
    for (let monkeyIdx = 0; monkeyIdx < monkeys.length; monkeyIdx++) {
      while (monkeys[monkeyIdx].itemsHeld.length > 0) {
        monkeyInspections[monkeyIdx]++
        executeMonkeyInspection(monkeys, monkeyIdx)
      }
    }
    console.log(
      monkeys
        .map(
          (m, idx) =>
            `${idx}: ${m.itemsHeld.map((i) => i.worryLevel).join(', ')}`
        )
        .join('\n')
    )
    console.log('')
  }

  console.log(monkeyInspections.map((m, idx) => `${idx}: ${m}`).join('\n'))

  console.log(
    `Monkey business level: ${getMonkeyBusinessLevel(monkeyInspections)}`
  )
}

const getMonkeyBusinessLevel = (monkeyInspections: number[]) => {
  const [firstMonkey, secondMonkey] = [
    ...monkeyInspections.sort((a, b) => b - a),
  ]

  return firstMonkey * secondMonkey
}

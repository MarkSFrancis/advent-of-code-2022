import { Monkey } from './parseMonkeys'

export const logMonkeyItems = (monkeys: Monkey[]) => {
  const text = monkeys.map(
    (m, mIdx) => `Monkey ${mIdx}: ${m.itemsHeld.map((i) => i.worryLevel).join(', ')}`
  ).join('\n')

  console.log(text)
  console.log('')
}

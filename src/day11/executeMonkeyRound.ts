import { Monkey } from './parseMonkeys'

/**
 * Amount to divide the worry level by after an inspection
 */
const WORRY_LEVEL_RELIEF_DIVISOR = 3

export const executeMonkeyInspection = (
  monkeys: Monkey[],
  currentMonkeyId: number
) => {
  const currentMonkey = monkeys[currentMonkeyId]
  const [currentItem] = currentMonkey.itemsHeld

  const afterInspectionLevel = currentMonkey.worryLevelUpdate(
    currentItem.worryLevel
  )

  currentItem.worryLevel = Math.floor(
    afterInspectionLevel / WORRY_LEVEL_RELIEF_DIVISOR
  )

  const truthy = currentMonkey.test.truthyCheck(currentItem.worryLevel)
  const passToMonkeyId = truthy
    ? currentMonkey.test.ifTrue.throwItemToMonkeyId
    : currentMonkey.test.ifFalse.throwItemToMonkeyId

  monkeys[passToMonkeyId].itemsHeld.push(currentItem)
  currentMonkey.itemsHeld.shift()
}

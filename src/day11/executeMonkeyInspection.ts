import { monkeyTestForThrow } from './monkeyTestForThrow'
import { optimiseOverflow } from './optimiseOverflow'
import { Monkey } from './parseMonkeys'

/**
 * @param worryLevelReliefDivisor Amount to divide the worry level by after an inspection
 */
export const executeMonkeyInspection = (
  monkeys: Monkey[],
  currentMonkeyId: number,
  worryLevelReliefDivisor: bigint,
  lowestCommonMultiple: bigint
) => {
  const currentMonkey = monkeys[currentMonkeyId]
  const [currentItem] = currentMonkey.itemsHeld

  const afterInspectionLevel = currentMonkey.worryLevelUpdate(
    currentItem.worryLevel
  )

  currentItem.worryLevel = afterInspectionLevel / worryLevelReliefDivisor

  currentItem.worryLevel = optimiseOverflow(
    lowestCommonMultiple,
    currentItem.worryLevel
  )

  const truthy = monkeyTestForThrow(currentMonkey, currentItem.worryLevel)
  const passToMonkeyId = truthy
    ? currentMonkey.test.ifTrue.throwItemToMonkeyId
    : currentMonkey.test.ifFalse.throwItemToMonkeyId

  monkeys[passToMonkeyId].itemsHeld.push(currentItem)
  currentMonkey.itemsHeld.shift()
}

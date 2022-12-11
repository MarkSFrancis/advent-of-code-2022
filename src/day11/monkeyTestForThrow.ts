import { Monkey } from './parseMonkeys'

export const monkeyTestForThrow = (monkey: Monkey, worryLevel: bigint) => {
  return worryLevel % monkey.test.divisor === 0n
}

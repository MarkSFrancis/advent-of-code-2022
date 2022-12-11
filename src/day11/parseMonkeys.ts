export interface Monkey {
  itemsHeld: HeldItem[]
  worryLevelUpdate: WorryLevelUpdateFunc
  test: MonkeyThrowTest
}

export interface MonkeyThrowTest {
  truthyCheck: WorryLevelTestFunc
  ifTrue: MonkeyThrowAction
  ifFalse: MonkeyThrowAction
}

export interface HeldItem {
  worryLevel: number
}

export type WorryLevelUpdateFunc = (worryLevel: number) => number
export type WorryLevelTestFunc = (worryLevel: number) => boolean

export interface MonkeyThrowAction {
  throwItemToMonkeyId: number
}

const MONKEY_DATA_PREFIXES = {
  monkeyId: 'Monkey ',
  startingItems: 'Starting items: ',
  operation: 'Operation: new = ',
  test: 'Test: divisible by ',
  testIfTrue: 'If true: throw to monkey ',
  testIfFalse: 'If false: throw to monkey ',
}

export const parseMonkeys = (rawData: string) => {
  return rawData.split('\n\n').map((r) => parseMonkey(r))
}

const parseMonkey = (rawData: string): Monkey => {
  const rawMonkey = extractRawMonkeyMeta(rawData)

  return {
    itemsHeld: rawMonkey.startingItems.split(', ').map<HeldItem>((i) => ({
      worryLevel: parseInt(i),
    })),
    test: {
      truthyCheck: parseTestToFunction(rawMonkey.test),
      ifTrue: {
        throwItemToMonkeyId: parseInt(rawMonkey.testIfTrue),
      },
      ifFalse: {
        throwItemToMonkeyId: parseInt(rawMonkey.testIfFalse),
      },
    },
    worryLevelUpdate: parseOperationToFunction(rawMonkey.operation),
  }
}

const extractRawMonkeyMeta = (
  rawData: string
): Record<keyof typeof MONKEY_DATA_PREFIXES, string> => {
  const lines = rawData.split('\n')

  const [monkeyId, startingItems, operation, test, testTrue, testFalse] =
    lines.map((l) => l.trim())

  if (
    !monkeyId.startsWith(MONKEY_DATA_PREFIXES.monkeyId) ||
    !startingItems.startsWith(MONKEY_DATA_PREFIXES.startingItems) ||
    !operation.startsWith(MONKEY_DATA_PREFIXES.operation) ||
    !test.startsWith(MONKEY_DATA_PREFIXES.test) ||
    !testTrue.startsWith(MONKEY_DATA_PREFIXES.testIfTrue) ||
    !testFalse.startsWith(MONKEY_DATA_PREFIXES.testIfFalse)
  ) {
    throw new Error(`Invalid monkey data: ${rawData}`)
  }

  return {
    monkeyId: monkeyId.substring(MONKEY_DATA_PREFIXES.monkeyId.length),
    startingItems: startingItems.substring(
      MONKEY_DATA_PREFIXES.startingItems.length
    ),
    operation: operation.substring(MONKEY_DATA_PREFIXES.operation.length),
    test: test.substring(MONKEY_DATA_PREFIXES.test.length),
    testIfTrue: testTrue.substring(MONKEY_DATA_PREFIXES.testIfTrue.length),
    testIfFalse: testFalse.substring(MONKEY_DATA_PREFIXES.testIfFalse.length),
  }
}

const parseTestToFunction = (rawTest: string): WorryLevelTestFunc => {
  const divisor = parseInt(rawTest)

  return (worryLevel) => worryLevel % divisor === 0
}

const parseOperationToFunction = (
  rawOperation: string
): WorryLevelUpdateFunc => {
  const [leftValRaw, operandRaw, rightValRaw] = rawOperation.split(' ')
  const variableOld = 'old'

  return (worryLevel) => {
    let leftVal: number
    if (leftValRaw === variableOld) {
      leftVal = worryLevel
    } else {
      leftVal = parseFloat(leftValRaw)
    }

    let rightVal: number
    if (rightValRaw === variableOld) {
      rightVal = worryLevel
    } else {
      rightVal = parseFloat(rightValRaw)
    }

    if (operandRaw === '+') {
      return leftVal + rightVal
    } else if (operandRaw === '*') {
      return leftVal * rightVal
    } else {
      throw new Error(`Invalid / unsupported operation: ${rawOperation}`)
    }
  }
}

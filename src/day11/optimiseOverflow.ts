export const optimiseOverflow = (
  lowestCommonMultiple: bigint,
  worryLevel: bigint
): bigint => {
  if (worryLevel > lowestCommonMultiple) {
    return worryLevel % lowestCommonMultiple
  } else {
    return worryLevel
  }
}

export const getLowestCommonMultiple = (numbers: bigint[]) => {
  let lcm = 1n
  for (const num of numbers) {
    lcm = (lcm * num) / getGreatestCommonDivisor(lcm, num)
  }

  return lcm
}

export const getGreatestCommonDivisor = (a: bigint, b: bigint): bigint => {
  if (b === 0n) return a

  return getGreatestCommonDivisor(b, a % b)
}

export const getMonkeyBusinessLevel = (monkeyInspections: number[]) => {
  const [firstMonkey, secondMonkey] = [
    ...monkeyInspections.sort((a, b) => b - a),
  ]

  return firstMonkey * secondMonkey
}

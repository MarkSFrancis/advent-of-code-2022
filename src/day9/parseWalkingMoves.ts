export enum RopeWalkingMoveDirection {
  Up = 'U',
  Right = 'R',
  Down = 'D',
  Left = 'L',
}

export interface RopeWalkingMove {
  direction: RopeWalkingMoveDirection
  steps: number
}

export const parseWalkingMoves = (rawData: string): RopeWalkingMove[] => {
  const instructions = rawData
    .split('\n')
    .map<RopeWalkingMove>((instruction) => {
      const [direction, steps] = instruction.split(' ')

      return {
        direction: direction as RopeWalkingMoveDirection,
        steps: parseFloat(steps),
      }
    })

  return instructions
}

import { Crate, CrateStacks } from './parseStacksData'

export const getTopCratesFromStacks = (stacks: CrateStacks) => {
  const topCrates = stacks.map<Crate>((s) => s.crates[s.crates.length - 1])

  return topCrates
}

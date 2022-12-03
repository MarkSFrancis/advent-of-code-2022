export const getItemPriority = (item: string) => {
  if (item.toLowerCase() === item) {
    return item.charCodeAt(0) - 96
  } else {
    return item.charCodeAt(0) - 64 + 26
  }
}

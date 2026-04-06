export const generateRgbaFromString = (string: string) => {
  const hash = string.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc)
  }, 0)

  return `rgba(${hash % 255}, ${hash % 255}, ${hash % 255}, 1)`
}

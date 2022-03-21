export function rgbToHex(color: string): string | null {
  //rgb转16进制颜色
  const regex = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/
  const match = color.match(regex)
  return match
    ? '#' +
        (+match[1]).toString(16) +
        (+match[2]).toString(16) +
        (+match[3]).toString(16)
    : color
}

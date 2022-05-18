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

export function getAllAttrs(elem: HTMLElement): Record<string, string>{
  const res = {}
  for (const key in elem.attributes) {
    if (Object.prototype.hasOwnProperty.call(elem.attributes, key)) {
      const attr = elem.attributes[key];
      res[attr.nodeName] = attr.nodeValue
    }
  }
  return res
}
import { getAllAttrs, rgbToHex } from '@/utils'

const handleBold = ({ style }) => {
  const { textSize, color } = style
  let start: string[] = []
  let end: string[] = []
  if (textSize) {
    start.push(`<size=${textSize}>`)
    end.push('</size>')
  }
  if (color) {
    start.push(`<color=${rgbToHex(color)}>`)
    end.push('</color>')
  }
  return [start.join(''), end.reverse().join('')]
}

const handleItalic = () => ['<i>', '</i>']

const handleUnderline = () => ['<u>', '</u>']

const handleBlock = ({ style }) => {
  const { textAlign, lineHeigth } = style

  let start: string[] = []
  let end: string[] = []
  if (lineHeigth) {
    // 甄别lineHeight值为 1.5 和 150% 两种情况
    const value = /%/g.test(lineHeigth) ? lineHeigth : `${lineHeigth * 100}%`
    start.push(`<line-height=${value}>`)
    end.push('</line-height>')
  }
  if (textAlign) {
    start.push(`<align=${textAlign}>`)
    end.push('</align>')
  }
  return [start.join(''), end.reverse().join('')+'<br>']
}

// 处理 <span></span> 标签
const handleSpan = ({ style }) => {
  const { textSize, color } = style

  let start: string[] = []
  let end: string[] = []
  if (color) {
    start.push(`<color=${rgbToHex(color)}>`)
    end.push('</color>')
  }
  if (textSize) {
    start.push(`<size=${textSize}>`)
    end.push('</size>')
  }
  return [start.join(''), end.reverse().join('')]
}

// 处理 <a></a> 标签
const handleA = ({ attrs }) => {
  const { type, name } = attrs
  let str = ''
  if (type === 'gameSystemLink') {
    // 内部链接
    if (name) {
      str += `<link=openSystem__@@__${name.slice(1)}>`
    }
  } else {
    // 外部链接
    if (name) {
      str += `<link=openUrl__@@__${name.slice(1)}>`
    }
  }
  return [str, '</link>']
}

// 处理 <br> 标签
const handleBr = () => {
  return ['', '<br>']
}

const parseUnitytRule = {
  'strong': handleBold,
  'b': handleBold,
  'i': handleItalic,
  'em': handleItalic,
  'p': handleBlock,
  'u': handleUnderline,
  'div': handleBlock,
  'span': handleSpan,
  'a': handleA,
  'br': handleBr
}

export function getTagNameUnity(
  htmlElement: HTMLElement,
): string[] {
  const nodeName = htmlElement.nodeName.toLocaleLowerCase()
  const attrs = getAllAttrs(htmlElement)
  const style = htmlElement.style
  if(parseUnitytRule[nodeName]) {
    return parseUnitytRule[nodeName]({style, attrs})
  } else {
    return ['', '']
  }
}

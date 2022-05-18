import { getAllAttrs, rgbToHex } from '@/utils'

const handleBold = ({ style }) => {
  const { textSize, color } = style
  let str = '<font bold=true'
  color && (str += ` color=${rgbToHex(color)}`)
  textSize && (str += ` size=${textSize}`)
  str += '>'
  return [str, '</font>']
}

const handleBlock = ({}) => {
  return ['', '<br>']
}

// 处理 <span></span> 标签
const handleSpan = ({style}) => {
  const { textSize, color } = style
  let str = '<font'
  if (color) {
    str += ` color=${rgbToHex(color)}`
  }
  if (textSize) {
    str += ` size=${textSize}`
  }
  str += '>'
  return [str, '</font>']
}

// 处理 <a></a> 标签
const handleA = ({attrs}) => {
  const { name } = attrs
  let str = ''
  if (name) {
    str += `<a href='event:openURL_${name.slice(1)}'>`
  }
  return [str, '</a>']
}

// 处理 <br> 标签
const handleBr = () => {
  return ['', '<br>']
}

const parseEgretRule = {
  'strong': handleBold,
  'b': handleBold,
  'p': handleBlock,
  'div': handleBlock,
  'span': handleSpan,
  'a': handleA,
  'br': handleBr
}

export function getTagNameEgret(htmlElement: HTMLElement,): string[] {
  //转义H5富文本格式头部标签
  const attrs = getAllAttrs(htmlElement)
  const style = htmlElement.style
  const nodeName = htmlElement.nodeName.toLocaleLowerCase()
  if(parseEgretRule[nodeName]) {
    return parseEgretRule[nodeName]({style, attrs})
  } else {
    return ['', '']
  }
}

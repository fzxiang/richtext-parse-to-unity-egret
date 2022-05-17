import { SetConfig } from '@/types'
import { rgbToHex } from '@/utils'

const handleBold = ({color, size}) => {
  let str = '<font bold=true'
  color && (str += ` color=${color}`)
  size && (str += ` size=${size}`)
  str += '>'
  return [str, '</font>']
}

const handleBlock = ({}) => {
  return ['', '<br>']
}

// 处理 <span></span> 标签
const handleSpan = ({color, size}) => {
  let str = '<font'
  if (color) {
    str += ` color=${color}`
  }
  if (size) {
    str += ` size=${size}`
  }
  str += '>'
  return [str, '</font>']
}

// 处理 <a></a> 标签
const handleA = ({name}) => {
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
export const parseEgretRule = {
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
  let color = rgbToHex(htmlElement.style['color'])
  let size = htmlElement.style['font-size'].replace('px', '')
  const name = htmlElement.getAttribute('name')
  const nodeName = htmlElement.nodeName.toLocaleLowerCase()
  if(parseEgretRule[nodeName]) {
    return parseEgretRule[nodeName]({name, color, size})
  } else {
    return ['', '']
  }
}

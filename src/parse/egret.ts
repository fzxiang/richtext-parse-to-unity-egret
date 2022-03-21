import { SetConfig } from '@/types'
import { rgbToHex } from '@/utils'

export function getTagNameStartEgret(
  htmlElement: HTMLElement,
  set: SetConfig
): string {
  //转义H5富文本格式头部标签
  let color = rgbToHex(htmlElement.style['color'])
  let size = htmlElement.style['font-size'].replace('px', '')
  let str = ''
  switch (htmlElement.nodeName.toLocaleLowerCase()) {
    case 'strong':
    case 'b':
      str += '<font bold="true"'
      if (color) {
        str += ` color=${color}`
      }
      if (size) {
        str += ` size=${size}`
      }
      str += ' >'
      return str
    case 'p':
    case 'div':
      return str
    case 'font':
      color = htmlElement.getAttribute('color')
      size = htmlElement.getAttribute('size')
      str += '<font'
      if (color) {
        str += ` color=${color}`
      }
      if (size) {
        str += ` size=${set.sizeMap[size]}`
      }
      str += ' >'
      return str
    case 'span':
      str += '<font'
      if (color) {
        str += ` color=${color}`
      }
      if (size) {
        str += ` size=${size}`
      }
      str += ' >'
      return str
    case 'a':
      const name = htmlElement.getAttribute('name')
      if (name) {
        str += `<a href='event:openURL_${name.slice(1)}'>`
      }
      return str
    default:
      return ''
  }
}

export function getTagNameEndEgret(htmlElement: HTMLElement): string {
  // const align = htmlElement.style['text-align']
  // const line_height = htmlElement.style['line-height']
  let str = ''
  const { firstElementChild, lastElementChild } = htmlElement
  switch (htmlElement.nodeName.toLocaleLowerCase()) {
    case 'strong':
    case 'b':
    case 'font':
    case 'span':
      return '</font>'
    case 'p':
    case 'div':
      /**
       * 以下情况则不转义
       * <div><br></div>
       * */
      if (lastElementChild && firstElementChild === lastElementChild) {
        if (lastElementChild.nodeName === 'BR') {
          return str
        } else if (
          firstElementChild.nodeName === 'FONT' &&
          firstElementChild?.firstElementChild?.nodeName === 'BR'
        ) {
          return str
        } else {
          return (str += '<br/>')
        }
      } else {
        return (str += '<br/>')
      }
    case 'br':
      str += '<br/>'
      return str
    case 'a':
      str += '</a>'
      return str
    default:
      return ''
  }
}

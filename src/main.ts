import { getTagNameStartUnity, getTagNameEndUnity } from '@/parse/unity'
import { getTagNameStartEgret, getTagNameEndEgret } from '@/parse/egret'
import { SetConfig } from '@/types'

export function parseUnity(htmlStr: string, set?: SetConfig): string {
  // 转义成unity支持格式
  const ele = document.createElement('div')
  ele.innerHTML = htmlStr

  let text = ''
  for (let e of ele.childNodes) {
    if (e instanceof HTMLElement) {
      text +=
        getTagNameStartUnity(e, set) +
        parseUnity(e.innerHTML, set) +
        getTagNameEndUnity(e)
      continue
    }
    text += e.textContent
  }
  return text
}

export function parseEgret(htmlStr: string, set?: SetConfig): string {
  // 转义成H5支持格式
  let ele = document.createElement('div')
  ele.innerHTML = htmlStr

  let text = ''
  for (let e of ele.childNodes) {
    if (e instanceof HTMLElement) {
      text +=
        getTagNameStartEgret(e, set) +
        parseEgret(e.innerHTML, set) +
        getTagNameEndEgret(e)
      continue
    }
    text += e.textContent
  }
  return text
}

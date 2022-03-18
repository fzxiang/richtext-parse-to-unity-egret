import { getTagNameStartUnity, getTagNameEndUnity } from './parse/unity.js'
import { getTagNameStartEgret, getTagNameEndEgret } from './parse/egret.js'

export function parseUnity(htmlStr, set) {
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

export function parseEgret(htmlStr, set) {
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

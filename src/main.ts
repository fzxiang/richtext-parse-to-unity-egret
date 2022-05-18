import { getTagNameUnity } from '@/parse/unity'
import { getTagNameEgret } from '@/parse/egret'

export function parseUnity(htmlStr: string): string {
  // 转义成unity支持格式
  const ele = document.createElement('div')
  ele.innerHTML = htmlStr

  let text = ''
  for (let e of ele.childNodes) {
    if (e instanceof HTMLElement) {
      const [start, end] = getTagNameUnity(e)
      text += start + parseUnity(e.innerHTML) + end
      continue
    }
    text += e.textContent
  }
  return text
}

export function parseEgret(htmlStr: string): string {
  // 转义成H5支持格式
  let ele = document.createElement('div')
  ele.innerHTML = htmlStr

  let text = ''
  for (let e of ele.childNodes) {
    if (e instanceof HTMLElement) {
      const [start, end] = getTagNameEgret(e)
      text += start + parseEgret(e.innerHTML) + end
      continue
    }
    text += e.textContent
  }
  return text
}

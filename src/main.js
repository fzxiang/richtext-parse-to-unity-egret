import { getTagNameStartUnity, getTagNameEndUnity } from './parse/unity.js';
import { getTagNameStartH5, getTagNameEndH5 } from './parse/h5.js';

export function parseUnity(htmlStr, set) {
	// 转义成unity支持格式
	const ele = document.createElement('div')
  ele.innerHTML = htmlStr

  let text = "";
  for (let e of ele.childNodes) {
    if (e instanceof HTMLElement) {
      text += getTagNameStartUnity(e,set) + parseUnity(e.innerHTML,set) + getTagNameEndUnity(e);
      continue
    }
    text += e.textContent;
  }
  return text
}

export function parseH5 (htmlStr,set) {
  // 转义成H5支持格式
  let ele = document.createElement('div')
  ele.innerHTML = htmlStr

  let text = "";
  for (let e of ele.childNodes) {
    if (e instanceof HTMLElement) {
      text += getTagNameStartH5(e,set) + parseH5(e.innerHTML,set) + getTagNameEndH5(e);
      continue
    }
    text += e.textContent;
  }
  return text
}
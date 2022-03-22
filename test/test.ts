import { parseUnity, parseEgret } from "../src/main";

import importModules from "import-modules";
const allCase = importModules('./case')

interface Case {
	test: string,
	expectUnity: string,
	expectEgret: string,
}

Object.keys(allCase).every(key => {
	const context = allCase[key] as Case
	if(context) {
		describe(`测试格式转化-${key}:`, () => {
			test(`Unity转化`, () => {
				expect(parseUnity(context.test))
				.toBe(context.expectUnity)
			})
			test(`Egret转化`, () => {
				expect(parseEgret(context.test))
				.toBe(context.expectEgret)
			})
		})
		
		return true
	} else {
		return false
	}
})

import { parseUnity, parseEgret } from "../src/main";
import { SetConfig } from "../src/types";
import importModules from "import-modules";
const allCase = importModules('./case')

interface Case {
	test: string,
	expectUnity: string,
	expectEgret: string,
	set?: SetConfig,
}

Object.keys(allCase).every(key => {
	const context = allCase[key] as Case
	if(context) {
		describe(`测试格式转化-${key}:`, () => {
			test(`Unity转化`, () => {
				expect(parseUnity(context.test, context.set))
				.toBe(context.expectUnity)
			})
			test(`Egret转化`, () => {
				expect(parseEgret(context.test, context.set))
				.toBe(context.expectEgret)
			})
		})
		
		return true
	} else {
		return false
	}
})

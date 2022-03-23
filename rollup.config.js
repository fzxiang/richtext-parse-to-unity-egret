import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from "@rollup/plugin-typescript";
import pkg from './package.json';

export default {
	input: './src/main.ts',
	plugins:[
		resolve(), // so Rollup can find `ms`
		commonjs(), // so Rollup can convert `ms` to an ES module
		typescript(),
	],
	output: [
		{
			name: 'richtext-parse-to-unity-egret',
			file: pkg.browser,
			format: 'umd',
		},
		{ file: pkg.main, format: 'cjs' },
		{ file: pkg.module, format: 'es' }
	]
}

import babel from '@rollup/plugin-babel';
import pkg from './package.json';

const license = `/*!
 * ${ pkg.name }
 * https://github.com/${ pkg.repository }
 * (c) 2021 @yomotsu
 * Released under the MIT License.
 */`;

export default {
	input: 'src/index.js',
	output: [
		{
			format: 'umd',
			name: 'waitStableFps',
			file: pkg.main,
			banner: license,
			indent: '\t',
		},
		{
			format: 'es',
			file: pkg.module,
			banner: license,
			indent: '\t',
		}
	],
	plugins: [ babel( {
		presets: [ '@babel/preset-env' ],
		babelHelpers: 'bundled'
	} ) ],
};

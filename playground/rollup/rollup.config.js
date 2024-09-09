import { defineConfig } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import styles from 'rollup-plugin-styles';
import { rollupPlugin as sonar } from 'unplugin-sonar';
// import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig( {
	input: 'src/index.js',
	output: {
		file: 'dist/index.js',
		sourcemap: true,
		format: 'es'
	},
	plugins: [
		commonjs( {
			sourceMap: true,
			defaultIsModuleExports: true
		} ),
		nodeResolve( {
			browser: true,
			preferBuiltins: false
		} ),
		styles( {
			mode: 'extract',
			sourceMap: true,
			// minimize: true
		} ),
		terser( {
			// format: {
			// 	comments: false
			// }
		} ),
		// visualizer(),
		sonar(),
	]
} );

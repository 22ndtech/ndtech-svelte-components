import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import livereload from 'rollup-plugin-livereload'
import css from 'rollup-plugin-css-only';

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/test.js',
  output: {
    file: `public/components.js`,
    format: 'iife',
    name: 'components'
  },
  plugins: [
    svelte({
      include: 'src/**/*.svelte',
      dev: true
    }),
		css({ output: 'bundle.css' }),
    resolve(),
    commonjs(),
    !production && livereload('public')
  ]
}

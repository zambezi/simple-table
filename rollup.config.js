import babel from 'rollup-plugin-babel'
import babelrc from 'babelrc-rollup'

export default {
  entry: 'src/main.js',
  dest: 'dist/simple-table.js',
  format: 'umd',
  moduleName: 'simpleTable',
  external: [ 'd3-selection' ],
  sourceMap: true,
  plugins: [ babel(babelrc()) ],
  globals: {
    'd3-selection': 'd3'
  }
}

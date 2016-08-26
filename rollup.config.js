import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  dest: 'dist/simple-table.js',
  format: 'umd',
  moduleName: 'simpleTable',
  external: [ '@zambezi/d3-rebind', 'd3-dispatch', 'd3-selection', 'underscore' ],
  sourceMap: true,
  plugins: [ babel({
    "presets": [["es2015", { "modules": false }]],
    "plugins": ["external-helpers"],
    "babelrc": false
  }) ],
  globals: {
    '@zambezi/d3-rebind': 'd3',
    'd3-dispatch': 'd3',
    'd3-selection': 'd3',
    'underscore': '_'
  }
}

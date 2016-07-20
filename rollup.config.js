import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/main.js',
  dest: 'dist/simple-table.js',
  format: 'umd',
  moduleName: 'simpleTable',
  sourceMap: true,
  plugins: [ babel() ]
}

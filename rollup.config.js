import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/main.js',
  dest: 'dist/simple-table.js',
  plugins: [ json(), babel() ]
}

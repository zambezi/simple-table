import json from 'rollup-plugin-json'

export default {
  entry: 'src/main.js',
  dest: 'dist/simple-table.js',
  plugins: [ json() ]
}

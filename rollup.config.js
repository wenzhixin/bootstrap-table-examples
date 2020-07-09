const rollup = require('rollup')
const babel = require('rollup-plugin-babel')

module.exports = [
  {
    input: 'utils/natural-sorting/src/natural-sorting.js',
    output: {
      file: 'utils/natural-sorting/dist/natural-sorting.js',
      format: 'umd'
    },
    plugins: [
      babel()
    ]
  }
]

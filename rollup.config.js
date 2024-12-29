import babel from 'rollup-plugin-babel'

export default [
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

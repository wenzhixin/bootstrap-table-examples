import eslintConfig from 'bootstrap-table/eslint.config.js'
import html from 'eslint-plugin-html'
import vue from 'eslint-plugin-vue'

const globals = eslintConfig[eslintConfig.length - 1].languageOptions.globals

globals.init = true

export default [
  {
    ignores: [
      '**/dist/**',
      'assets/js/docs.min.js',
      'integrate/',
      'webpack-starter/'
    ]
  },
  {
    files: ['**/*.html'],
    plugins: { html }
  },
  ...eslintConfig,
  ...vue.configs['flat/recommended'],
  {
    rules: {
      'no-alert': 'off',
      'no-console': 'off',
      'no-unused-vars': ['error', {
        varsIgnorePattern: 'mounted'
      }],
      'vue/html-self-closing': 'off'
    }
  }
]

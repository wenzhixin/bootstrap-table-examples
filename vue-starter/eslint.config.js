import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'

export default [
  {
    files: ['**/*.js', '**/*.vue'],
    languageOptions: {
      ecmaVersion: 'latest'
    },
    rules: js.configs.recommended.rules
  },
  ...pluginVue.configs['flat/recommended']
]

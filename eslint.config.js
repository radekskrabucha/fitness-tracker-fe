import pluginJs from '@eslint/js'
import pluginQuery from '@tanstack/eslint-plugin-query'
import eslintConfigPrettier from 'eslint-config-prettier'
import solid from 'eslint-plugin-solid'
import globals from 'globals'
import tseslint from 'typescript-eslint'

const config = [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  solid.configs['flat/typescript'],
  ...pluginQuery.configs['flat/recommended'],
  eslintConfigPrettier,
  {
    languageOptions: { globals: globals.browser },
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-empty-object-type': 'off'
    }
  }
]

export default config

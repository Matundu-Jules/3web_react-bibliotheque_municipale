import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default tseslint.config(
    { ignores: ['dist'] },
    {
        // Extension des configs recommandées JS, TS, Prettier
        extends: [
            js.configs.recommended,
            ...tseslint.configs.recommended,
            prettier, // Désactive les règles conflictuelles avec Prettier
        ],
        files: ['**/*.{ts,tsx,js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            // Active Prettier comme règle d'erreur
            'prettier/prettier': 'error',
        },
    }
)

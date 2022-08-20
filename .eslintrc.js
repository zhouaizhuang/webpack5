module.exports = {
  extends: ['eslint:recommended'],
  env: {
    node: true,
    browser: true
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  rules: {
    'no-undef': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/no-unused-vars': 'off',
    'vue/require-v-for-key': 'off',
    'no-unused-vars': 'off',
    'vue/no-unused-components': 'off'
  },
}

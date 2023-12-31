module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'class-methods-use-this': 'off',
    'import/no-extraneous-dependencies': 'off',
    'consistent-return': 'off',
    camelcase: 'off',
    'max-len': 'off',
    // disables this rule only for the variables named as 'next'
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};

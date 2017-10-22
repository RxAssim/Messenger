module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier', 'jest'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 0,
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
  },
  env: {
    'jest/globals': true,
  },
};

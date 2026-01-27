module.exports = {
  env: {
    node: true,
    es2022: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/__tests__/**/*.js'],
      env: {
        jest: true,
      },
      rules: {
        'no-underscore-dangle': 'off',
      },
    },
  ],
};

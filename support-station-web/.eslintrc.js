module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import'],
  rules: {
    'react/jsx-filename-extension': 0,
    quotes: ['error', 'single', { avoidEscape: true }],
    indent: ['error', 2],
  },
};

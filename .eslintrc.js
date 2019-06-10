module.exports = {
  extends: ['airbnb', 'prettier'],
  plugins: ['react', 'jsx-a11y', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'react/prefer-stateless-function': [0],
    'react/jsx-wrap-multilines': ['error', { declaration: false, assignment: false }],
    'react/forbid-prop-types': [0],
    'react/require-default-props': [0],
  },
};

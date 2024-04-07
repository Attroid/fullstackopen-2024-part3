const pluginStylistic = require("@stylistic/eslint-plugin-js");

module.exports = {
  files: ["**/*.js"], // This might need to be adjusted or split based on ESLint version and how it accepts configs
  ignores: ["phonebook-frontend/**/*"],
  languageOptions: {
    sourceType: "commonjs",
  },
  plugins: {
    "@stylistic/js": pluginStylistic,
  },
  rules: {
    "@stylistic/js/indent": ["error", 2],
    "@stylistic/js/linebreak-style": ["error", "unix"],
    "@stylistic/js/quotes": ["error", "double"],
    "@stylistic/js/semi": ["error", "always"],
  },
};

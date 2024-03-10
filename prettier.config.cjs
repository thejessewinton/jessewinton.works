/** @type {import("prettier").Config} */
module.exports = {
  semi: false,
  trailingComma: "none",
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  jsxSingleQuote: true,
  bracketSpacing: true,
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
};

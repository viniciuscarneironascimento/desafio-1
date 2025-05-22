const js = require("@eslint/js");
const globals = require("globals");
const { defineConfig } = require("eslint/config");

// Configuração para arquivos JS dentro de cypress/e2e
module.exports = defineConfig([
  {
    files: ["cypress/e2e/**/*.js"], // Inclui todos os arquivos JS dentro de cypress/e2e
    plugins: { js },
    languageOptions: { 
      globals: {
        ...globals.node,
        cy: "readonly",       // Adicionando o Cypress como variável global
        describe: "readonly", // Adicionando o describe como variável global
        it: "readonly",       // Adicionando o it como variável global
      },
    },
    rules: {
      'indent': ['error', 2], // 2 espaços para indentação
      'no-magic-numbers': 'warn', // Evita números mágicos no código
      'quotes': ['error', 'single'], // Preferência por aspas simples
      'no-trailing-spaces': 'error', // Evita espaços no final da linha
      'space-before-blocks': ['error', 'always'], // Espaço antes de chaves de bloco
      'semi': ['error', 'always'], // Exige ponto e vírgula no final de instruções
      'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // Não marca variáveis não usadas como erro
    },
  },
]);

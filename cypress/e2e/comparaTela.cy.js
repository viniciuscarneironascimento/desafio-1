/// <reference types="cypress" />

it('deve corresponder à imagem de referência', () => {
  cy.visit('https://www.npmjs.com/package/cypress-image-snapshot');

  // O matchImageSnapshot() é uma asserção que falha o teste se houver divergência visual com o elemento do cy.get (que pode ser body, header ou qualquer trecho da tela selecionado no blobo)
  // Se houver erro, o resultado será exibido na pasta snapshots/__diff_outpit__
  // Haverá um arquivo PNG com print das duas telas com destaque para o ponto diferente entre elas
  cy.get('#readme').matchImageSnapshot();

  // Este comando atualiza o arquivo de referência e executa os testes apenas de comparaTela.cy.js. Obs.: na primeira execução sempre irá funcionar
  // npm run test:update-snapshots que executa "cypress run --spec cypress/e2e/comparaTela.cy.js --env updateSnapshots=true"

  // Para realizar validações futuras para validar mudanças é recomendado usar o comando abaixo no terminal ou a execução via interface do Cypress
  // npx cypress run --spec cypress/e2e/comparaTela.cy.js

});
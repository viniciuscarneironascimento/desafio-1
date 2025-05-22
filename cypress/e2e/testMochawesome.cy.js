/// <reference types="cypress" />

describe('Teste Mochawesome', () => {
  it('deve abrir a página da aplicação local', () => {
    // Caso de teste criado para simular a chamada do script "test:report": "node generate-report.js" que gera o relatório mochawesome
    // npm run test:report
    cy.visit('http://localhost:3000/api-docs');
    cy.contains('CMS For QA\'s (API de Gestão de Conteúdo)');
  });
});
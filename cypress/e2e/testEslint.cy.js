/// <reference types="cypress" />

it('deve exibir erro de ESLint no código', () => {
      cy.visit('http://localhost:3000/api-docs');
    cy.contains('CMS For QA\'s (API de Gestão de Conteúdo)');
  });

  
  /*
  cy.get('#elemento-alvo').matchImageSnapshot({
  failureThreshold: 0.03, // tolerância de 3%
  failureThresholdType: 'percent',
});

*/
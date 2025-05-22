/// <reference types="cypress" />

describe('Desafio 1', () => {
  it('deve abrir a página da aplicação local', () => {
    //const erroIntencional = "Isso nunca será usado"; // ao descomentar esta linha a aba "PROBLEMS" exibe erro referente a Variável não utilizada. O uso de espaços ou falta de ponto e vírgula para encerrar um trecho do código também será mostrado nesta aba.

    //Pesquisei se era possível acessar uma aplicação rodando em um servidor local (localhost) desde que o servidor seja iniciado na máquina local.
    cy.visit('http://localhost:3000/api-docs');
    cy.contains('CMS For QA\'s (API de Gestão de Conteúdo)');
  });
});
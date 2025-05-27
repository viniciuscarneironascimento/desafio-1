/* eslint-disable indent */
describe('Aplicação da função Session do Cypress', () => {
  beforeEach(() => {
    cy.session('usuario-logado', () => {
      cy.visit('https://front.serverest.dev/login');
      cy.get('[data-testid="email"]').type('contato.vinicius@gmail.com');
      cy.get('[data-testid="senha"]').type('12345', { log: false });
      cy.get('[data-testid="entrar"]').click();
      cy.url().should('include', '/home');
    });
  });

  const logDadosDeSessao = () => {
    cy.window().then((win) => {
      // localStorage
      const localKeys = Object.keys(win.localStorage);
      cy.log('📦 localStorage:');
      localKeys.forEach((key) => {
        cy.log(`${key}: ${win.localStorage.getItem(key)}`);
      });

      // sessionStorage
      const sessionKeys = Object.keys(win.sessionStorage);
      cy.log('📦 sessionStorage:');
      sessionKeys.forEach((key) => {
        cy.log(`${key}: ${win.sessionStorage.getItem(key)}`);
      });
    });

    // cookies
    cy.getCookies().then((cookies) => {
      if (cookies.length > 0) {
        cy.log('🍪 Cookies:');
        cookies.forEach((cookie) => {
          cy.log(`${cookie.name}: ${cookie.value}`);
        });
      } else {
        cy.log('⚠️ Nenhum cookie encontrado');
      }
    });
  };

  it('deve acessar a página minha lista de produtos', () => {
    cy.visit('https://front.serverest.dev/minhaListaDeProdutos');
    cy.contains('Lista de Compras').should('be.visible');
    logDadosDeSessao();
  });

  it('deve acessar a página carrinho', () => {
    cy.visit('https://front.serverest.dev/carrinho');
    cy.contains('Em construção aguarde').should('be.visible');
    cy.get('[data-testid="logout"]').click();
    //Com o logout acima os dados da sessão não são mostrados no log
    logDadosDeSessao();
  });

  it('deve acessar a página inicial logado home', () => {

    //Mesmo com o logout do it anterior, a sessão foi recuperada nestes teste
    cy.visit('https://front.serverest.dev/home');
    cy.contains('Serverest Store').should('be.visible');
    logDadosDeSessao();
  });
});

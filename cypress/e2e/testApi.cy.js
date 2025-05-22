/* eslint-disable no-magic-numbers */
import { faker } from '@faker-js/faker';
let emailUsuario;
let idUsuario;
let authToken; // Variável para armazenar o token

const emailFixo = 'joao@email.com';
const senhaFixa = 'Senha123';

describe('Funcionalidades de Usuários', () => {

  before(() => {
    // 1º tenta autenticar com usuário existente
    cy.request({
      method: 'POST',
      url: '/auth/login',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        email: emailFixo,
        senha: senhaFixa
      },
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        cy.log('Usuário fixo autenticado com sucesso');
        idUsuario = response.body.user.id;
        authToken = response.body.token;
      } else {
        cy.log('Usuário fixo não encontrado. Criando novo usuário...');

        const usuarioPayload = {
          nomeCompleto: faker.person.fullName(),
          nomeUsuario: `${faker.person.firstName()}${faker.person.lastName()}`,
          email: faker.internet.email().toLowerCase(),
          senha: senhaFixa // mesma senha para facilitar reuso
        };

        cy.log(JSON.stringify(usuarioPayload, null, 2));

        cy.request({
          method: 'POST',
          url: '/usuarios',
          body: usuarioPayload,
          failOnStatusCode: false
        }).then((resCriacao) => {
          expect(resCriacao.status).to.eql(201);
          idUsuario = resCriacao.body.id;
          emailUsuario = resCriacao.body.email;

          // Após criação, autenticar o novo usuário
          cy.request({
            method: 'POST',
            url: '/auth/login',
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: {
              email: usuarioPayload.email,
              senha: usuarioPayload.senha
            }
          }).then((resNovoLogin) => {
            expect(resNovoLogin.status).to.eql(200);
            authToken = resNovoLogin.body.token;
          });
        });
      }
    });
  });

  it('deve buscar um usuário específico quando informo ID existente e token válido', () => {
    // Problema: ter que criar um novo usuário para obter o id e token válidos toda vez que executar
    // Solução: criar apenas um usuário no before geral e usar o ID válido

    //const userId = '55ffde46-172d-458f-acfb-e540a2e8c7c9'; // ID do usuário para teste

    cy.request({
      method: 'GET',
      url: `/usuarios/${idUsuario}`,
      headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${authToken}` // Usa o token obtido
      }
    }).then((response) => {
      // Validações
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', idUsuario);
      // Adicione outras validações conforme necessário
    });
  });

  it('deve falhar busca de usuário por ID quando informo token inválido', () => {

    // Problema: ter que criar um novo usuário para obter o id válido toda vez que executar
    // Solução: criar apenas um usuário no before geral e usar o ID válido

    // Obter ID válido: a busca geral depende de token
    const userId = '55ffde46-172d-458f-acfb-e540a2e8c7c9';

    cy.request({
      method: 'GET',
      url: `/usuarios/${userId}`,
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer token.invalido' // Token inválido
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401); // Não autorizado
    });
  });

  it('deve criar um novo usuário quando dados válidos são fornecidos', () => {

    //'deve criar um usuário quando dados válidos são enviados'
    // Senha setada direto pois não retona após criação do usuário nem nas consultas
    const usuarioPayload = {
      nomeCompleto: faker.person.fullName(),
      nomeUsuario: `${faker.person.firstName()}${faker.person.lastName()}`,
      email: faker.internet.email().toLowerCase(), // evita erro com e-mails com letras maiúsculas
      senha: 'Senha123' //faker.internet.password({ length: 8 })
    };

    cy.log(JSON.stringify(usuarioPayload, null, 2));

    cy.request({
      method: 'POST',
      url: '/usuarios',
      body: usuarioPayload,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eql(201);
      idUsuario = response.body.id;
      emailUsuario = response.body.email;
      cy.log(idUsuario);
      cy.log(emailUsuario);
    });
  });
});

describe('Autenticação na API Gestão de Conteúdo', () => {
  it('deve autenticar o usuário quando dados existentes são fornecidos', () => {
    // 1º Passo: Tentar autenticar com dados fixos
    cy.request({
      method: 'POST', // Método HTTP POST
      url: '/auth/login', // Endpoint da API
      headers: {
        'accept': 'application/json',  // Header Accept
        'Content-Type': 'application/json'  // Tipo de conteúdo
      },
      body: {  // Corpo da requisição
        email: 'joao22222@email.com',
        senha: 'Senha123'
      },
      failOnStatusCode: false // Permite status != 2xx sem falhar o teste
    }).then((authResponse) => {
      if (authResponse.status === 200) {
        // Se autenticação OK, valida os dados
        expect(authResponse.body.user.id).to.be.not.empty;
        expect(authResponse.body.user.nomeCompleto).to.eql('João da Silva');
        expect(authResponse.body.token).to.be.not.empty;
      } else {
        // Se falhar (status != 200), cadastra um novo usuário
        cy.log('Autenticação falhou. Criando novo usuário...');

        // Cria novo usuário para validar o teste e manter a independência dos testes
        const usuarioPayload = {
          nomeCompleto: faker.person.fullName(),
          nomeUsuario: `${faker.person.firstName()}${faker.person.lastName()}`,
          email: faker.internet.email().toLowerCase(), // evita erro com e-mails com letras maiúsculas
          senha: 'Senha123' //faker.internet.password({ length: 8 })
        };
        cy.log(JSON.stringify(usuarioPayload, null, 2));

        cy.request({
          method: 'POST',
          url: '/usuarios',
          body: usuarioPayload,
          failOnStatusCode: false
        }).then((cadastroResponse) => {
          expect(cadastroResponse.status).to.eql(201);
          idUsuario = cadastroResponse.body.id;
          emailUsuario = cadastroResponse.body.email;
          cy.log(`Novo usuário criado: ${cadastroResponse.body.email}`);
          cy.log(idUsuario);

          // 2º Tenta autenticar novamente com o novo usuário
          cy.request({
            method: 'POST',
            url: '/auth/login',
            headers: {
              'accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: {
              email: usuarioPayload.email,
              senha: usuarioPayload.senha
            }
          }).then((newAuthResponse) => {
            expect(newAuthResponse.status).to.eql(200);
            expect(newAuthResponse.body.token).to.be.not.empty;
          });
        });
      }
    });
  });

  it('deve exibir erro ao tentar autenticar com email ou senha inválidos', () => {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        email: 'erro99999@email.com',
        senha: 'Senha1234567890'
      },
      failOnStatusCode: false
    }).then((authResponse) => {
      expect(authResponse.status).to.eql(401);
      expect(authResponse.body.erro).to.eql('Email ou senha inválidos');
    });
  });

  it('deve exibir erro ao tentar autenticar com dados inválidos', () => {
    cy.request({
      method: 'POST', // Método HTTP POST
      url: 'http://localhost:3000/auth/login', // Endpoint da API
      headers: {
        'accept': 'application/json',  // Header Accept
        'Content-Type': 'application/json'  // Tipo de conteúdo
      },
      body: {  // Corpo da requisição
        email: 'erroTeste',
        senha: '99999'
      },
      failOnStatusCode: false  // Permite testar respostas de erro
    }).then((response) => {
      expect(response.status).to.eql(400);   // Verifica status 400 (Não autorizado)
      expect(response.body.errors[0].type).to.eql('field');
      expect(response.body.errors[0].value).to.eql('erroTeste');
      expect(response.body.errors[0].msg).to.eql('Email inválido');
      expect(response.body.errors[0].path).to.eql('email');
      expect(response.body.errors[0].location).to.eql('body');
    });
  });

  it('deve simular erro 500 durante carregamento da aplicação', () => {
    // Requisição feita com cy.request() NÃO FUNCIONA para localhost:3000
    //cy.intercept() só intercepta requisições feitas pelo navegador controlado pelo Cypress, ou seja, ações iniciadas via interface da aplicação.

    // Aqui intercepto a requisição real e modifico o retorno dela abaixo
    cy.intercept({
      method: 'GET',
      url: '/api/erro'
    }, {
      statusCode: 500,  // Atribui status 500 mockado
      headers: {
        'Content-Type': 'text/html' // Aqui está o segredo!
      },
      body: '<html><body>Erro interno do servidor</body></html>' // Response
    }).as('erroAPI');

    // Ação no frontend
    cy.visit('/api/erro', {
      failOnStatusCode: false
    });

    // Validação no retorno da API intercptada
    cy.wait('@erroAPI').then((interception) => {
      expect(interception.response.statusCode).to.eq(500);  //valida que o retorno é 500 conforme mock
    });

    // Validação no frontend que depende da resposta da API para renderizar
    cy.contains('Erro interno do servidor').should('be.visible');
  });
});
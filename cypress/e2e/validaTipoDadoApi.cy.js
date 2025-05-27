/* eslint-disable no-magic-numbers */
/* eslint-disable indent */

/*
Objetivo
//Deve validar tipo de dado diferente de string
Executar uma única suíte de testes Cypress que:
Testa o campo "nome" usando vários valores de tipos variados
Envia cada valor como parte do corpo da requisição
Verifica se a API responde corretamente (por exemplo, 400 para valores inválidos)
*/

describe('Validação de tipos para o campo "nome"', () => {
    const url = Cypress.env('baseUrlApi') + '/usuarios';

    const valores = [
        "",
        //" "
        null,
        {},
        [],
        [1, 2],
        { nome: "outro" },
        0,
        1,
        -1,
        1.5,
        -1.5,
        9999999999999999999999999999999999,
        true,
        false,
        Number.MAX_SAFE_INTEGER,
        NaN,
        Infinity,
        /regex/
    ];

    valores.forEach((valor, index) => {
        it(`Teste ${index + 1}/${valores.length} | nome = ${JSON.stringify(valor)}`, () => {
            const payload = {
                nome: valor,
                email: "teste999@qa.com.br",
                password: "teste",
                administrador: "true"
            };

            cy.request({
                method: 'POST',
                url,
                body: payload,
                failOnStatusCode: false // Permite testar códigos 400, 500 etc.
            }).then((response) => {
                cy.log(`Status recebido: ${response.status}`);
                cy.log(`Valor testado: ${JSON.stringify(valor)}`);

                // 🔁 Ajuste aqui conforme o comportamento esperado
                expect(response.status).to.eq(400);
            });
        });
    });
});


/* eslint-disable indent */
/* eslint-disable no-magic-numbers */

describe('Classificação de tempo de resposta da API', () => {
    it('Deve classificar o tempo de resposta da API', () => {
        cy.request('GET', 'https://serverest.dev/usuarios')
            .then((response) => {
                const duracao = response.duration; // tempo em ms

                cy.log(`⏱️ Tempo de resposta: ${duracao} ms`);

                if (duracao <= 200) {
                    cy.log('✅ Muito rápido ≤ 200 ms');
                    expect(duracao).to.be.at.most(200); //o valor deve ser no máximo 200.
                } else if (duracao > 200 && duracao <= 500) {
                    cy.log('⚡ Rápido 200 ms – 500 ms');
                    expect(duracao).to.be.above(200).and.at.most(500); //o valor deve ser acima de 200 e no máximo 500.
                } else if (duracao > 500 && duracao < 1000) {
                    cy.log('👌 Aceitável 500 ms – 1s');
                    expect(duracao).to.be.above(500).and.below(1000); //o valor deve acima de 500 e abaixo de 1000.
                } else if (duracao >= 1000 && duracao < 2000) {
                    cy.log('🐢 Ruim entre 1s e 2s');
                    expect(duracao).to.be.at.least(1000).and.below(2000); //o valor deve ser pelo menos 1000 e abaixo de 2000.
                } else {
                    cy.log('🚨 Crítico ≥ 2s');
                    expect(duracao).to.be.at.least(2000); //o valor deve ser pelo menos 2000.
                }
            });
    });
});
const baseUrlApi = Cypress.env('baseUrlApi');

export const cadastrarUsuario = (payload) => {
    return cy.request({
        method: 'POST',
        url: `${baseUrlApi}/usuarios`,
        body: payload,
        failOnStatusCode: false
    });
};

export const buscarUsuarioPorId = (id) => {
    return cy.request({
        method: 'GET',
        url: `${baseUrlApi}/usuarios/${id}`,
        failOnStatusCode: false
    });
};

export const editarUsuario = (id, payload) => {
    return cy.request({
        method: 'PUT',
        url: `${baseUrlApi}/usuarios/${id}`,
        body: payload,
        failOnStatusCode: false
    });
};

export const excluirUsuario = (id) => {
    return cy.request({
        method: 'DELETE',
        url: `${baseUrlApi}/usuarios/${id}`,
        failOnStatusCode: false
    });
};

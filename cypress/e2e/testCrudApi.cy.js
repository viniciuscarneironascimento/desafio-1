/* eslint-disable indent */
/* eslint-disable no-magic-numbers */
import { cadastrarUsuario, buscarUsuarioPorId, editarUsuario, excluirUsuario } from '../support/api/usuario';
import { faker } from '@faker-js/faker';

describe('Teste de API - CRUD Usuários', () => {
    // Cria payload de usuário
    let user = {
        nome: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        administrador: faker.datatype.boolean().toString()
    };

    it('Deve cadastrar, buscar, atualizar e excluir um usuário', () => {
        cadastrarUsuario(user).then((response) => {
            expect(response.status).to.eq(201);
            const userId = response.body._id;

            buscarUsuarioPorId(userId).then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body.nome).to.eq(user.nome);

                editarUsuario(userId, { ...user, nome: 'Novo Nome' }).then((resUpdate) => {
                    expect(resUpdate.status).to.eq(200);

                    excluirUsuario(userId).then((resDelete) => {
                        expect(resDelete.status).to.eq(200);
                    });

                    buscarUsuarioPorId(userId).then((res) => {
                        expect(res.status).to.eq(400);
                    });
                });
            });
        });
    });
});

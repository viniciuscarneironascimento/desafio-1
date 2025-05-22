# 📌 Desafio 1 - Projeto de Testes com Cypress

Este desafio tem como objetivo desenvolver e demonstrar conhecimentos práticos em testes automatizados utilizando Cypress, além de explorar ferramentas complementares como Postman, ESLint, Mochawesome e testes de API.

---

## ✅ Etapas Realizadas

### 1. 🔱 Fork do Servidor de API no GitHub
Realizei um fork do repositório original contendo a API necessária para os testes. Esse repositório foi clonado e executado localmente para garantir independência dos testes.

### 2. 🔎 Testes com Postman
Antes de iniciar a automação, testei os endpoints da API utilizando o Postman. Isso garantiu que a API estava funcional e ajudou na definição dos cenários de teste.

### 3. 🤖 Automação com Cypress
Implementei testes automatizados utilizando o Cypress, simulando o comportamento do usuário na interface e interagindo com a API para verificar respostas e fluxos esperados.

### 4. 🧹 Testes Estáticos com ESLint
Configurei o ESLint no projeto para garantir a padronização e qualidade do código JavaScript. Isso ajuda a prevenir erros comuns e a manter um código limpo e legível.

### 5. 📸 Testes Snapshot
Implementei testes de snapshot com o pacote `cypress-image-snapshot` para validar visualmente componentes e páginas da aplicação, garantindo que não ocorram alterações inesperadas no layout.

### 6. 📊 Geração de Relatório com Mochawesome
Configurei o reporter **Mochawesome** para geração de relatórios detalhados em HTML sobre os testes automatizados. Isso facilita a visualização dos resultados e possíveis falhas.

### 7. 🌐 Testes de API
Implementei testes diretamente na API utilizando o Cypress para validar os endpoints, métodos HTTP, status de resposta e estrutura dos dados retornados.

---

## 🚀 Tecnologias Utilizadas

- Cypress
- Postman
- ESLint
- Mochawesome
- cypress-image-snapshot

---

1. Fork do Servidor de API no GitHub
Acessei o repositório original: https://github.com/jvitor-gomes/cms-for-qas-api e entrei na minha conta do GitHub.

Cliquei em Fork e um novo repositório foi criado na minha conta: cms-for-qas-api.

Clonei o repositório na minha máquina local:

Escolhi a opção de clonagem via HTTPS no GitHub;

Abri um novo terminal Bash no VS Code;

Executei o comando:

bash
Copiar
Editar
git clone https://github.com/viniciuscarneironascimento/cms-for-qas-api.git
Listei as pastas com ls, acessei o repositório com cd cms-for-qas-api e abri o projeto no VS Code com:

bash
Copiar
Editar
code .
Tentei iniciar o servidor com o comando:

bash
Copiar
Editar
npm run dev
Porém, ocorreu um erro.

Consultei o arquivo README.md do repositório e identifiquei que era necessário instalar as dependências locais. Executei:

bash
Copiar
Editar
npm install
Instalação realizada com sucesso.

Após isso, executei novamente:

bash
Copiar
Editar
npm run dev
O servidor foi iniciado com sucesso e a documentação Swagger ficou disponível em: http://localhost:3000/api-docs/

Extra: abri um novo terminal para verificar se o projeto estava vinculado ao repositório remoto no GitHub com o comando:

bash
Copiar
Editar
git remote -v
O retorno foi:

perl
Copiar
Editar
origin  https://github.com/viniciuscarneironascimento/cms-for-qas-api.git (push)
Leitura e Exploração do Swagger:

Tentei executar o endpoint de Autenticação POST /auth/login com os dados de exemplo fornecidos na documentação, mas recebi o erro: "email ou senha inválidos". Esse endpoint autentica um usuário e retorna um token JWT.

Para resolver, criei um novo usuário utilizando o endpoint POST /usuários (que não requer autenticação), com os dados de exemplo (nome, email e senha: "Senha123"). A criação foi bem-sucedida (status 201) e copiei o id retornado.

Em seguida, voltei ao endpoint POST /auth/login, forneci os dados do novo usuário no corpo da requisição e obtive com sucesso o token JWT.

Response body
{
  "user": {
    "id": "55ffde46-172d-458f-acfb-e540a2e8c7c9",
    "nomeCompleto": "João da Silva",
    "nomeUsuario": "joaosilva",
    "email": "joao@email.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU1ZmZkZTQ2LTE3MmQtNDU4Zi1hY2ZiLWU1NDBhMmU4YzdjOSIsImlhdCI6MTc0NjYzNjM4NCwiZXhwIjoxNzQ2NzIyNzg0fQ.z38imJEZQym12BLKETJKyqoBdna83DcxEIk7S_nUAmc"
}


Tentei executar o endpoint de consulta de usuário GET /usuários/{id} para validar a criação do novo usuário. Informei o ID corretamente, mas recebi o status 401 (Não autorizado) com a mensagem de erro: "token não fornecido".

Percebi então que a autenticação é necessária. No Swagger, cliquei no botão "Authorize" no canto superior direito e informei o token JWT no campo "value". Após isso, todos os endpoints que exigem autenticação passaram a funcionar corretamente.

Observações:

O endpoint de Autenticação (POST /auth/login) não requer token, mas exige que o usuário já esteja cadastrado.

O endpoint de consulta de usuário (GET /usuários/{id}) requer token para ser acessado.

O endpoint de criação de usuário (POST /usuários) não exige autenticação, ou seja, pode ser utilizado livremente para cadastrar novos usuários no sistema.




2. Testar pelo Postman
Acessei o Postman (www.postman.com), fiz login e criei uma nova Collection no meu workspace com o nome DESAFIO1.

Copiei o cURL de um endpoint (Autenticação), importei no Postman e, ao executar, recebi a seguinte mensagem de erro:

"Ao testar uma API localmente, você precisa usar o Agente Postman Desktop. No momento, você tem um agente diferente selecionado, que não pode enviar solicitações ao localhost."

Para resolver, fiz o download do Postman Desktop Agent. Após a instalação, o ícone do Postman passou a ser exibido na área de notificação (canto inferior direito da tela, junto aos demais aplicativos do sistema).

Reexecutei a requisição e ela funcionou corretamente.

3. Criar automação Cypress (desafio.cy.js)
Antes de iniciar o projeto Cypress, pesquisei se era possível acessar uma aplicação rodando em servidor local (localhost) — desde que o servidor estivesse ativo na máquina.

Criei uma pasta para o projeto e inicializei o Node.js com:

bash
Copiar
Editar
npm init -y
Instalei o Cypress como dependência de desenvolvimento:

bash
Copiar
Editar
npm install cypress --save-dev
Abri o projeto no VS Code com:

bash
Copiar
Editar
code .
Executei o Cypress pela primeira vez com:

bash
Copiar
Editar
npx cypress open
Isso gerou a estrutura de pastas padrão (cypress/, node_modules/, etc.).

Criei um arquivo de teste chamado desafio.cy.js para desenvolver os cenários de teste.

Criei um arquivo .gitignore para evitar o versionamento de arquivos desnecessários.

Realizei uma validação básica no site local (localhost) com sucesso.

Problemas como variáveis não utilizadas, espaços em excesso ou ausência de ponto e vírgula são exibidos na aba PROBLEMS, ao lado da aba TERMINAL no VS Code.



4. Criar testes estáticos com ESLint (testeEslint.cy.js)
Instalei o ESLint com o seguinte comando:

bash
Copiar
Editar
npm install --save-dev eslint
Com o auxílio do ChatGPT, configurei o arquivo eslintrc.js e realizei todos os ajustes necessários para validar erros estáticos, como:

Variáveis nunca utilizadas

Falta de ponto e vírgula

Problemas de indentação, entre outros

Esta etapa foi a mais trabalhosa, pois diversos erros foram identificados e precisaram ser corrigidos.

Executei as validações com ESLint usando o seguinte comando no terminal:
Ex passo 3
C:\Users\Vinicius\desafio1-cypress\cypress\e2e\testEslint.cy.js
  4:1  error  Expected indentation of 2 spaces but found 6  indent
  5:1  error  Expected indentation of 2 spaces but found 4  indent
  6:1  error  Expected indentation of 0 spaces but found 2  indent
  8:1  error  Trailing spaces not allowed                   no-trailing-spaces
  9:1  error  Expected indentation of 0 spaces but found 2  indent

✖ 5 problems (5 errors, 0 warnings)
  5 errors and 0 warnings potentially fixable with the `--fix` option.


4- Já o comando “"eslint:cypress2": "eslint && test"” ou “npm run eslint:cypress2” executa o “eslint” antes de executar o cypress. Havendo erro, o cypress nem chega a ser executado obrigando o desenvolvedor a corrigir os erros no código. Erros capturados pelo ESLint também serão exibidos na aba "PROBLEMS" ao lado de TERMINAL.







5. Criar testes de snapshot (comparaTela.cy.js)
Criei o arquivo comparaTela.cy.js para implementar os testes de snapshot.

Utilizei a biblioteca Cypress Image Snapshot, uma integração com o Cypress que permite capturar imagens da interface e compará-las com imagens de referência, garantindo que não haja regressões visuais.

Instalei a dependência com o comando:

bash
Copiar
Editar
npm install --save-dev cypress-image-snapshot
Quando há diferenças entre as imagens, o resultado é exibido na pasta snapshots/__diff_output. Nela é gerado um arquivo .png com o print das duas telas, destacando visualmente os pontos divergentes.

Para atualizar a imagem de referência e executar apenas os testes do arquivo comparaTela.cy.js em modo headless, utilizei o comando:

bash
Copiar
Editar
npm run test:update-snapshots
Esse script está configurado como:

json
Copiar
Editar
"test:update-snapshots": "cypress run --spec cypress/e2e/comparaTela.cy.js --env updateSnapshots=true"
Neste modo, o teste sempre passará, pois a imagem será comparada com uma referência recém-gerada. O ideal é usar:

bash
Copiar
Editar
cypress run --spec cypress/e2e/comparaTela.cy.js
para validar se houve mudanças posteriores no layout.

Os testes foram realizados com sucesso.

6. Gerar relatório de testes com Mochawesome
Precisei instalar o Mochawesome com a opção --legacy-peer-deps, devido a conflitos com a biblioteca de snapshot:

bash
Copiar
Editar
npm install --save-dev mochawesome mochawesome-merge mochawesome-report-generator --legacy-peer-deps
Essa etapa foi uma das mais desafiadoras do projeto, pois os comandos para unificar os arquivos JSON e gerar um relatório HTML consolidado inicialmente não funcionaram como esperado.

Tentei utilizar o Allure Report, mas desisti temporariamente por conta da dependência do Java.

Com auxílio do ChatGPT, criei uma alternativa viável com um arquivo JavaScript (generateReport.js) para automatizar o processo de montagem do relatório consolidado. Esse arquivo foi salvo na raiz do projeto e é executado com:

bash
Copiar
Editar
node generateReport.js
O script realiza as seguintes etapas:

swift
Copiar
Editar
✅ Rodando testes...
✅ Gerando arquivo report.json...
📄 Gerando relatório HTML...
⚠️ Erro ao remover report.json:', err.message
🎉 Relatório gerado corretamente em: cypress/results/report.html
Vantagens de utilizar .js ao invés de .sh:

Permite manter toda a base em JavaScript

Pode ser executado em diferentes ambientes (Windows, Linux ou CI/CD) com maior compatibilidade

7. Criar testes de API (testeApi.cy.js)
Desenvolvi diversos cenários de testes de API no arquivo testeApi.cy.js.

Utilizei payloads dinâmicos com a biblioteca faker, além de ganchos como before para configurar pré-condições dos testes.

Realizei validações de:

Requisições POST e GET

Autenticação via token

Simulação de erros com intercept (mock)

Validações de respostas no response body

Criação de novos registros, entre outros




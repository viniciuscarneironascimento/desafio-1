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

# Fork do servidor de API no GitHub
1- Acessei o repositório https://github.com/jvitor-gomes/cms-for-qas-api e loguei na minha conta do GitHub
2- Cliquei em fork e um novo repositório foi criado na minha conta: cms-for-qas-api (https://github.com/viniciuscarneironascimento/cms-for-qas-api)
3- Clonar na minha máquina local
- Escolhi a opção clinar via HTTPS no GitHub
- Abri um novo terminal bash no VS Code
- Executei o comando git clone https://github.com/viniciuscarneironascimento/cms-for-qas-api.git
- Procurei pela pasta do repositório local (ls) e acessei: cd cms-for-qas-api e abri a pasta no VS Code (comando “code .”)
4- Tentei iniciar o servidor com o comando “npm run dev” mas deu erro 
- Consultei a documentação (Readme.md) do repositório e verifiquei que era necessário instalar as dependências local com o comando “npm install”. Instalação realizada com sucesso.
- Tentei iniciar o servidor novamente com o comando “npm run dev”. Servidor iniciado com sucesso http://localhost:3000/api-docs/   (Swagger).
5- Extra: abri novo terminal para consultar se o projeto estava associado ao servidor remoto no GitHub através do comando “git remote -v”. Obtive retorno “origin  https://github.com/viniciuscarneironascimento/cms-for-qas-api.git (push)”
6- Leitura e entendimento do Swagger
- Tentei executar o endpoint “Autenticação” POST /auth/login com os dados de exemplo da documentação e retornou “erro: email ou senha inválidos”. Este endpoint Autentica um usuário e retorna um token JWT.
- Precisava criar um novo usuário. Executei o endpoint POST /usuários (não requer autenticação) para criar um novo usuário e utilizar no passo anterior. Utilizei os dados de exemplo da documentação (nome, email e senha “Senha123”). Então o novo usuário foi criado com sucesso (status 201). Copiei o “id”.
- Retornei para o endpoint de “Autenticação” POST /auth/login, forneci os dados no request body (email e senha) e então foi gerado um token JWT.

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

- Tentei executar o endpoint de consulta de usuário para validar a criação do novo usuário através de GET /usuários/{id}, informei o id, porém retornou status 401 (não autorizado) e a mensagem de erro “token não fornecido”.
- Então percebi que a autorização é concedida ao clicar no botão localizado no canto superior direito “Autorize” onde informei no campo “value” o token JWT. Desta forma todos os endpoints que requerem autenticação passaram a funcionar.
- OBS: o endpoint “Autenticação” não requer token, porém precisa ter um usuário cadastrado. O endpoint de busca de usuário (GET) precisa de token. Por fim, o endpoint para criar um novo usuário (POS /usuário) cria um novo usuário no sistema (não requer autenticação).

---

# Testar pelo Postman
1- Realizei login no Postman (www.postman.com) e criei uma nova collection em meu workspace com nome DESAFIO1.

2- Copiei o CURL de um endpoint (Autenticação), importei no Postman e ao executar recebi a mensagem de erro “Ao testar uma API localmente, você precisa usar o Agente Postman Desktop. No momento, você tem um Agente diferente selecionado, que não pode enviar solicitações ao Localhost .”

3- Então fiz o download do “Desktop Agent” para tentar executar solicitação local (localhost). Após instalação, o ícone do postman fica habilitado no canto inferir direito junto com outros aplicativos do sistema.

4- Ao refazer a requisição funcionou conforme esperado.

---

# Criar automação Cypress (desafio.cy.js)
1- Antes de cria o projeto Cypress, pesquisei se era possível acessar uma aplicação rodando em um servidor local (localhost)  desde que o servidor seja iniciado na máquina local

2- Criei uma pasta e executei o comando npm init -y para inicializar um projeto node.js

3- Instalei o cypress npm install cypress –save-dev

4- Abri o projeto no VSCode com code .

5- Executei o cypress pela primeira vez (npx cypress open) onde foram criadas as pastas do cypress junto ao node.

6- Criei um arquivo básico para criar os casos de teste (desafio.cy.js).

7- Criei o arquivo gitignore para evitar que arquivos desnecessários sejam commitados.

8- Validação básica do site localhost com sucesso.

9- Erros referentes a variável não utilizada, espaços desnecessários ou falta de ponto e vírgula para encerrar um trecho do código serão exibidos na aba "PROBLEMS" ao lado de TERMINAL.

---

# Criar testes estáticos ESLint  (testeEslint.cy.js)
1- Instalação do ESLint (npm install --save-dev eslint).

2- Com o auxílio do ChatGpt configurei o arquivo eslintrc.js e todos os ajustes necessários para validar erros estáticos como: variáveis =nunca usadas, falta de ponto e vírgula, endentação etc. Esta etapa foi a mais demorada devido a vários erros.

3- Realizei validações com ESLint com o comando “npx eslint cypress/e2e --ext .js” no terminal ou “npm run eslint”. Este comando executa o “eslint” para validar erros no código e exibe no terminal. Neste comando não é executado o cypress. Veja exemplo abaixo.

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

---

# Criar testes snapshot (comparaTela.cy.js)
1- Foi criado arquivo comparaTela.cy.js para implementar estes testes.

2- Utilizei Cypress Image Snapshot, que é uma integração do Cypress para capturar snapshots e compará-los com imagens de referência para garantir que não haja regressões visuais.

3- Instalando a dependência: npm install --save-dev cypress-image-snapshot

4- Se houver erro, o resultado será exibido na pasta snapshots/__diff_outpit. Haverá um arquivo PNG com print das duas telas com destaque para o ponto diferente entre elas.

5- Ao executar o comando "test:update-snapshots": "cypress run --spec cypress/e2e/comparaTela.cy.js --env updateSnapshots=true", a imagem de referência é atualizada e executado a validação apenas dos testes do arquivo “comparaTela.cy.js” em modo hedless. Neste exemplo sempre irá passar pois a tela será comparada com uma imagem que acabou de ser capturada. O ideal é usar “cypress run --spec cypress/e2e/comparaTela.cy.js” pois irá validar mudanças posteriores no layout.

6- Testes realizados com sucesso.

---

# Teste report mochawesome
1- Tive que instalar modo “forçado” pois havia conflito com a biblioteca do snapshot: --legacy-peer-deps.

2- Etapa bastante desafiadora deste projeto pois os comandos para mergear e gerar um relatório html consolidado não estava funcionando.

3- Desisti de utilizar o mochawesome devido aos conflitos de versões e dependências com outras bibliotecas e optei pelo Allure Report. Porém, devido dependência do java voltei atrás.

4- Com o auxílio do ChatGpt encontrei uma alternativa para rodar as etapas de montagem do relatório CONSOLIDADO no mochawesome utilizando um arquivo com extensão .js (“generate-report.js”) onde pude colocar toda a lógica de montagem do relatório consolidado. Este arquivo foi salvo na raiz do projeto e é executado através do comando node: "node generateReport.js". Ele realiza as etapas:

✅ Rodando testes...

✅ Gerando arquivo report.json...

📄 Gerando relatório HTML...

⚠️ Erro ao remover report.json:', err.message);

🎉 Relatório gerado corretamente em: cypress/results/report.html'


5- Vantagens de utilizar .js ao invés de .sh:
Você quer manter uma base padronizada em JavaScript
Pretende rodar o mesmo comando localmente, em Windows, ou numa CI/CD

---

# Criar testes de API  (testeApi.cy.js)
1- Criação de vários cenários de teste de API.

2- Criação de payload dinêmico com faker, uso de ganchos (before)

3- Validações de requests do tipo POST, GET, autenticação, simulação de erros com mock (intercept), validação de cenários de erro no response body, criação de novos registros etc.


const { exec } = require('child_process');
const { promisify } = require('util');
const { unlink } = require('fs');

const run = promisify(exec);

async function runCommand(command, options = {}) {
  try {
    const { stdout, stderr } = await run(command, options);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    // ⚠️ Continua mesmo com erro (ex: testes falharam)
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.error(error.stderr);
    console.warn(`⚠️ Comando "${command}" retornou erro, mas continuará.`);
  }
}

async function generateReport() {
  console.log('✅ Rodando testes...');
  await runCommand('npx cypress run');

  console.log('✅ Gerando arquivo report.json...');
  await runCommand('npx mochawesome-merge "cypress/results/*.json" > report.json');

  console.log('📄 Gerando relatório HTML...');
  await runCommand('npx marge report.json --reportDir "cypress/results" --inline');

  console.log('🧹 Limpando arquivo temporário...');
  unlink('report.json', (err) => {
    if (err) console.warn('⚠️ Erro ao remover report.json:', err.message);
  });

  console.log('🎉 Relatório gerado corretamente em: cypress/results/report.html');
}

generateReport();

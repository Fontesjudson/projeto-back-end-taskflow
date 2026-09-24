const fs = require('fs');
const path = require('path');
const os = require('os');
 
console.log('===AMBIENTE===');
console.log('node.js:', process.version);
console.log('Sistema:', os.platform());
console.log('Pasta atual:', _dirname);

console.log('');
console.log('=== ARQUIVO NA PASTA ===');
const arquivos = fs.readdirSync('.');
arquivos.forEach(arquivo => {
    console.log(' -', arquivo);
});

console.log('');
console.log('=== CAMINHO DO FUTURO SERVIDOR ===');
const caminhoServidor = path.join(_dirname, 'src', 'server.js');
console.log(') servidor ficara em:', caminhoServidor);

//DESAFIO: descobrir quantos arquivos js existem na pasta
const arquivosJS = arquivos.filter(a => a.endsWith('.js'));
console.log('');
console.log('Arquivos .js encontrados: ${arquivosJS.length}');
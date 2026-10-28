const criarErro = require('./criarErro');

function traduzirErroPrisma (erro, metodo) {
    if (erro.code === 'p2002') {
        const campos = erro.meta?.target;
        return criarErro(409, 'Já existe um registro com esse valor',
            ['valor repetido em: ${campos}']);
    }
    if (erro.code === 'p2003') {
        if (metodo === 'DELETE') return criarErro(409,
            'Não é possivel excluir: existem registros ligados a este');
            return criarErro(400, 'Um dos ids informados não existe');
        }
        if (erro.code === 'p2025') {
            return criarErro(404, 'Registro não encontrado');
        }
        return erro;
}
module.exports = traduzirErroPrisma;
const traduzirErroPrisma = require('../utils/traduzirErroPrisma');
const criarErro = require('../utils/criarErro');

const p2003 = { code: 'p2003' };
const p2025 = { code: 'p2025' };

describe('siute de testes', () => {
  it('deve traduzir o erro p2002 para um erro 409', () => {
    const erro = { code: 'p2002', meta: { target: ['campo1', 'campo2'] } };
    const resultado = traduzirErroPrisma(erro);
    expect(resultado).toEqual(criarErro(409, 'Já existe um registro com esse valor', ['valor repetido em: ${campos}']));
  });
})

test('p2003 ao atualizar (PUT) vira 409', () => {
    expect(traduzirErroPrisma(p2003, 'PUT').status).toBe(409);
});

test('p2003 ao gravar (PUT) vira 404', () => {
    expect(criarErro(404, 'Um dos ids informados não existe').status).toBe(404);
});

test('p2025 (registro não encontrado)', () => {
    const erro = traduzirErroPrisma(p2025, 'PUT');
    expect(erro.status).toBe(404);
    expect(erro.message).toBe('Registro não encontrado');
})

test('p2025 (registro não encontrado) ao deletar (DELETE)', () => {
    const erro = criarErro(404, 'Registro não encontrado');
    expect(erro.status).toBe(404);
    expect(erro.message).toBe('Registro não encontrado');
})

test('p2003 (DELETE) não é possivel excluir: existem registros ligados a este', () => {
    const erro = traduzirErroPrisma(p2003, 'DELETE');
    expect(erro.status).toBe(409);
    expect(erro.message).toBe('Não é possivel excluir: existem registros ligados a este');
});

test('p2003 (DELETE) não é possivel excluir: existem registros ligados a este', () => {
    const erro= criarErro(409, 'Não é possivel excluir: existem registros ligados a este');
    expect(erro.status).toBe(409);
    expect(erro.message).toBe('Não é possivel excluir: existem registros ligados a este');
});




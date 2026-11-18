const traduzirErroPrisma = require('../utils/traduzirErroPrisma');
const criarErro = require('../utils/criarErro');

const p2003 = { code: 'p2003' };
const p2025 = { code: 'p2025' };

describe('suite de testes', () => {
  test('1. criarErro(500, ...) tem status 500 e detalhes underfined', () => {
    const erro = criarErro(500, 'Erro interno no servidor');
    
    expect(erro.status).toBe(500);
    expect(erro.detalhes).toBeUnderfined();
  });


test('2. P2003 ao atualizar (PUT) vira 400 com mensagem certa', () => {
    const erro = traduzirErroPrisma({ code: 'P2003'}, 'PUT');

    expect(erro.status).toBe(400);
    expect(erro.detalhes).toBe("Um dos id's informados não existe");
});

test('3. P2025 tem a mensagem "Registro não encontrado"', () => {
    const erro = traduzirErroPrisma({ code: 'P2025'}, 'DELETE')

    expect(erro.message).toBe('Registro não encontrado');
});

test('4. P2003 ao excluir tem a mensagem que diz o motivo', () => {
    const erro = traduzirErroPrisma({ code: 'P2003'}, 'DELETE');
   
    expect(erro.message).toBe('Não é possível excluir: existem registros ligados a este');
  });
})


const traduzirErroPrisma = require('../utils/traduzirErroPrisma');

const erroP2002 = { code: 'p2002', meta: { target: ['email'] } };
const erroP2003 = { code: 'p2003' };

test('p2002, (valor repetido) vira 409 e diz o campo repetido', () => {
    const erro = traduzirErroPrisma(erroP2002, 'POST');
    expect(erro.status).toBe(409);
    expect(erro.detalhes).toEqual(['valor repetido em: email']);
});

test('p2003 ao gravar (POST) vira 400', () => {
 expect(traduzirErroPrisma(erroP2003, 'POST').status).toBe(400);
});

test('p2003 ao deletar (DELETE) vira 409', () => {
    expect(traduzirErroPrisma(erroP2003, 'DELETE').status).toBe(409);
});

test('p2025 (registro não encontrado) vira 404', () => {
    const erro = traduzirErroPrisma({ code: 'p2025' }, 'PUT');
    expect(erro.status).toBe(404);
});

test('codigo nao tratado devolve o MESMO erro, o que vira 500', () => {
    const outro = { code: 'p1001', menssagem: 'banco fora do ar' };
    const erro = traduzirErroPrisma(erroPrisma, 'GET');
    expect(outro).toBe(erro);
    expect(erro.status).toBeUndefined();
});
const criarErro = require('../utils/criarErro');

describe('criarErro', () => {
  test('devolve um erro com status e a mensagem', () => {
   const erro = criarErro(404, 'Tarafa nao encontrada');
    expect(erro).toBeInstanceOf(Error);
    expect(erro.status).toBe(404);
    expect(erro.message).toBe('Tarafa nao encontrada');
  });
});
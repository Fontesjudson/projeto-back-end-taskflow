const validar = require('../src/middlewares/validar');
const schemas = require('../src/middlewares/schemas');

function pegarErro(funcao) {
   try {
    funcao(); 
   } catch (erro) {
    return erro;
   }
}

function tarefavalida() {
    return {
        texto: 'Revisar o plano de texto',
        coluna: 'afazer',
        usuario_id: 1,
        projeto_id: 1,
        idprioridade: 2
    };
}

describe('validar', () => {
    test('chama o next quando os dados estão certos', () => {
        const middlewares = validar(schemas.criarTarefa);
        const req = { body: tarefaValida() };
        const next = jest.fn();
        middlewares(req, {} , next);
        expect(next).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith();
    });
})

test('sem body: 400 com um detalhe por campo obrigatório', () => {
const middleware = validar(schemas.tarefa);
const req = {};
const next = jest.fn();

const erro = pegarErro(() => middleware(req, {}, next));
expect(erro.status).toBe(400);
expect(erro.message).toBe('Dados inválidos');
expect(erro.detalhes).toEqual([
"O campo 'texto' é obrigatório",
"O campo 'coluna' é obrigatório",
"O campo 'usuario_id' é obrigatório",
"O campo 'projeto_id' é obrigatório",
"O campo 'idprioridade' é obrigatório",
]);
expect(next).not.toHaveBeenCalled();
});
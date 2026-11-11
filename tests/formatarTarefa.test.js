const formatarTarefa = require('../utils/formatarTarefa');

function tarefaDoPrisma() {
    return { id: 1, texto: 'Definir tabelas do banco', coluna: 'Afazer', projetos: { nome: 'TaskFlow' }, usuarios: { nome: 'Ana Lima' }, prioridades: { descricao: 'Alto' } };
}

test('achata as relaçoes no formato que o front espera', () => {
    const resultado = formatarTarefa(tarefaDoPrisma());
    expect(resultado).toEqual({
        id: 1,
        texto: 'Definir tabelas do banco',
        coluna: 'Afazer',
        projeto: 'TaskFlow',
        usuario: 'Ana Lima',
        prioridades: 'Alto'
    });
});

test('deixa o campo underfined quando a relaçao nao veio', () => {
    const tarefa = tarefaDoPrisma();
    delete tarefa.prioridades;
    const resultado = formatarTarefa(tarefa);
    expect(resultado.prioridade).toBeUndefined();
    expect(resultado.projeto).toBe('TaskFlow');
});

test('nao altera a tarefa original', () => {
    const tarefa = tarefaDoPrisma();
    const resultado = formatarTarefa(tarefa);
    expect(resultado).not.toBe(tarefa);
    expect(tarefa).toHaveProperty('projetos', { nome: 'TaskFlow' });
});

//test('')
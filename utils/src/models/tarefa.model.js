let tarefas = [ { id: 1, titulo: "Estudar Node.js", prioridade: "alta", coluna: "andamento" },
                { id: 2, titulo: "Criar API", prioridade: "média", coluna: "a fazer" },
                { id: 3, titulo: "Testar Postman", prioridade: "média", coluna: "concluída"}
];

let proximoId = 4;

module.exports = {
    listar: () => tarefas,
    listarPorColuna: (coluna) => tarefas.filter(tarefa => tarefa.coluna === coluna),
    buscar: (id) => tarefas.find(t => t.id === id),
    
    adicionar: ({ titulo, prioridade, coluna }) => {
        const nova = { id: proximoId++, titulo, prioridade: prioridade || 'afazer', coluna: coluna || 'a fazer' };
        tarefas.push(nova);
        return nova;
    },

 atualizar: (id, dados) => {
    const idx = tarefas.findIndex(t => t.id === id);
    if (idx === -1) return null;
    tarefas[idx] = {...tarefas[idx], ...dados, id};
    return tarefas[idx];
 },
 
 remover: (id) => {
    constidx = tarefas.findIndex(t => t.id === id);
    if (idx === -1) return null;
    return tarefas.splice(idx, 1)[0];
 },
};
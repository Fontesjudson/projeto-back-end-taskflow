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
        const nova = { id: proximoId++, titulo, prioridade, coluna };
        tarefas.push(nova);
        return nova;
    }
};
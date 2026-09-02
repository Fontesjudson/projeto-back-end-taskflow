let tarefas = [ { id: 1, titulo: "Estudar Node.js", prioridade: "alta", coluna: "a fazer" }, 
                { id: 2, titulo: "Criar API", prioridade: "alta", coluna: "em andamento" },
                { id: 3, titulo: "Testar Postman", prioridade: "média", coluna: "concluída" }];
let proximoId = 4;

const tarefasControllers = {
    listar(req, res)  {
        const { coluna } = req.query;
        let resultado = tarefas;
        if (coluna) {
            resultado = tarefas.filter(t => t.coluna === coluna);
        }
        res.json(resultado);
    },

    buscarPorId(req, res)  {
        const id = parseInt(req.params.id);
        const tarefa = tarefas.find(t => t.id === id);
        if (!tarefa) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }
        res.json(tarefa);
    },

    criar(req, res) {
        const { titulo, prioridade, coluna } = req.body;
        if (!titulo) return res.status(400).json({ error: "Título obrigatório" });
        const novaTarefa = { id: proximoId++, titulo, prioridade: prioridade || "média", coluna: coluna || "a fazer" };
        tarefas.push(novaTarefa);
        res.status(201).json(novaTarefa);
    },

    atualizar(req, res) {
        const id = parseInt(req.params.id);
        const idx = tarefas.findIndex(t => t.id === id);
        if (idx === -1) return res.status(404).json({ error: "Tarefa não encontrada" });
        tarefas[idx] = { ...tarefas[idx], ...req.body, id };
        res.json(tarefas[idx]);
    },

    remover(req, res) {
        const id = parseInt(req.params.id);
        const idx = tarefas.findIndex(t => t.id === id);
        if (idx === -1) return res.status(404).json({ error: "Tarefa não encontrada" });
        tarefas.splice(idx, 1);
        res.status(200).json({ message: "Tarefa removida com sucesso" });
    },

    estatisticas(req, res) {
        const { coluna } = req.query;
        const base = coluna ? tarefas.filter(t => t.coluna === coluna) : tarefas;
        const porColuna = {
            "a fazer": base.filter(t => t.coluna === "a fazer").length,
            "em andamento": base.filter(t => t.coluna === "em andamento").length,
            "concluída": base.filter(t => t.coluna === "concluída").length
        };
       res.json({ total: base.length, porColuna });
    },
};

module.exports = tarefasControllers;
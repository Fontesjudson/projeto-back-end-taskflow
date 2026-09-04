let tarefas = [ { id: 1, titulo: "Estudar Node.js", prioridade: "alta", coluna: "a fazer" }, 
                { id: 2, titulo: "Criar API", prioridade: "alta", coluna: "em andamento" },
                { id: 3, titulo: "Testar Postman", prioridade: "média", coluna: "concluída" }];
let proximoId = 4;
let usuarioId = id;
const prioridades = ["alta", "média", "baixa"];

const tarefasControllers = {
    listar(req, res)  {
        const { coluna } = req.query;
        const resultado = coluna
       ? tarefaModel.listarPorColuna(coluna)
       : tarefaModel.listar();
        res.json(resultado);
    },

    buscarPorId(req, res)  {
        const tarefa = tarefaModel.buscar(parseInt(req.params.id));
        if (!tarefa) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }
        res.json(tarefa);
    },

    criar(req, res) {
        const { usuarioId } = usuariosModel.buscar(parseInt(req.params.id));
        const { titulo } = req.body;
        const { coluna } = tarefaModel.listarPorColuna(req.body.coluna);
        if (tarefas.length > 1) return res.status(400).json({ error: "Limite de 2 tarefas em andamento por usuario atingido" });
        const { prioridade } = req.body;

        if (prioridade && !prioridades.includes(prioridade)) {
            return res.status(400).json({ error: "Prioridade inválida. Use 'alta', 'média' ou 'baixa'." });
        }
        if (!titulo ) return res.status(400).json({ error: "Título e usuário obrigatórios" });
        if (!usuarioId) return res.status(400).json({ error: "Usuário não encontrado" });
       res.status(201).json(tarefaModel.adicionar(req.body))

    },

    atualizar(req, res) {
       const atualizada = tarefaModel.atualizar(parseInt(req.params.id), req.body);
       if (!atualizada || !prioridades.includes(atualizada.prioridade)) return res.status(404).json({erro: 'Tarefas nao encontrada'});
        res.json(atualizada);
    },

    remover(req, res) {
        const removida = tarefaModel.remover(parseInt(req.params.id));
        if (!removida) return res.status(404).json({erro: "Tarefa nao encontrada"});
        res.json({mensagem: 'Tarefa removida', tarefa: removida});
    },

    estatisticas(req, res) {
        const { coluna } = req.query;
        const base = coluna ? tarefaModel.listarPorColuna(coluna) : tarefaModel.listar();
        const porColuna = {
            "a fazer": base.filter(t => t.coluna === "a fazer").length,
            "em andamento": base.filter(t => t.coluna === "em andamento").length,
            "concluída": base.filter(t => t.coluna === "concluída").length
        };
       res.json({ total: base.length, porColuna });
    },
};

module.exports = tarefasControllers;
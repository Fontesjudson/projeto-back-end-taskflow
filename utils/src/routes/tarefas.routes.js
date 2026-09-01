const express = require('express');
const router = express.Router();

let tarefas = [ { id: 1, titulo: 'Estudar node', prioridade: 'alta', coluna: "a fazer" }, 
                { id: 2, titulo: 'Criar API', prioridade: 'alta', coluna: "em andamento" },
                { id: 3, titulo: 'Testar Postman', prioridade: 'media', coluna: "concluido" }  ];

let proximoId = 4;

router.get('/', (req, res) => {
    const { coluna } = req.query;
    let resultado = tarefas;
    if (coluna) {
        resultado = tarefas.filter(t => t.coluna === coluna);
    }
    res.json({ api: 'TaskFlow', versao: '1.0', status: 'online'});
});

router.get('/:id', (req, res) => {
    const id =parseInt(req.params.id);
    const tarefa = tarefas.find(t => t.id === id);
    if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    res.json(tarefa);
});

router.post('/', (req, res) => {
    const {texto, prioridade, coluna } = req.body;
if (!texto) return res.status(400).json({ error: 'Texto obrigatório' });
const nova = {id: proximoId++, texto, prioridade: prioridade || 'media',
coluna: coluna || 'a fazer' };
tarefas.push(nova);
res.status(201).json(nova);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idx = tarefas.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    tarefas[idx] = { ...tarefas[idx], ...req.body, id };
    res.json(tarefas[idx]);

});
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idx = tarefas.findIndex(t => t.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    const tarefaRemovida = tarefas.splice(idx, 1) [0];
    res.json({ mensagem: 'Tarefa removida', tarefa: Removida });
});

module.exports = router;
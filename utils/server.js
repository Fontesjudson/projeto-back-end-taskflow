const express = require('express');
const app = express();
const PORTA = 3000;

app.use(express.json());

let usuarios = [
    {id: 1, nome:'admin', email:'admin@taskflow.com', senha: '1234'}, ];

let proximoIdUsuario = 2;

app.get('/', (req, res) => {
    res.json({ api: 'TaskFlow', versao: '1.0', status: 'online'});
});

app.get('/usuarios', (req, res) => {
    console.log(req.headers);
    console.log('baseURL:', req.host);
    console.log('URL:', req.url);
    res.json(usuarios);
});


app.get('/ok', (req, res) => {
    res.json({ status: 'ok', dados: [1, 2, 3] });
});

app.get('/criado', (req, res) => {
    res.status(201).json({ mensagem: 'Usuario criado com sucesso'});
});

app.get('/erro', (req, res) => {
    res.status(400).json({ erro: 'Usuario invalido' });
});

app.get('/texto', (req, res) => {
    res.send('Resposta em texto simples');
});

app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;
    const novoUsuario = {
        id: proximoId++,
        nome: nome,
        email: email,
        senha: senha,
    };
    tarefas.push(novoUsuario);

    res.status(201).json(novoUsuario);
});

app.put('/usuarios/1', (req, res) => {
    const id = Number(req.params.id);
    const { nome, email, senha } = req.body;
    const indice = tarefas.findIndex(t => t.id === id);

    if (indice === -1) {
        return res.status(404).json({ erro: 'Usuario nao encontrada'});
    }

    const tarefasAtualizada = { nome, email, senha };
    tarefas[indice] = tarefaAtualizada;

    res.json(tarefaAtualizada);
    {/*const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) {
        return res.status(404).json({ erro: 'Tarefa nao encontrada'});
    }
    res.json(tarefas);*/}
});

app.delete('/usuarios/1', (req, res) => {
    const id = Number(req.params.id);
    const usuario = tarefas.find(t => t.id === id);

    if (!usuario) {
        return res.status(400).json({ erro: 'Usuario nao encontrado'});
    }
    tarefas = tarefas.filter(t => t.id !== id);

    res.json({ mensagem: 'Usuario removido', id: 1});
});

app.use((req, res) => {
    res.status(404).json({
        erro: 'Rota nao encontrada',
        metodo: req.metod,
        caminho: req.url
    });
});

app.listen(PORTA, () => {
    console.log('Servidor rodando em https://localhost:${PORTA}');
});

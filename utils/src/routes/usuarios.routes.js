const express = require('express');
const router = express.Router();

let usuarios =  {id: 1, nome:'admin', email:'admin@taskflow.com', senha:'1234'};
let proximoId = 2;

router.get('/', (req, res) => {
    const coluna = req.query;
    let resultado = usuarios;
    if (coluna) {
        resultado = usuarios.filter(u => u.coluna === coluna);
    }
    res.json({ api: 'TaskFlow', versao: '1.0', status: 'online'});
});

router.get('/:id', (req, res) => {
    const id =parseInt(req.params.id);
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) {
        return res.status(404).json({ error: 'Usuario não encontrado' });
    }
    res.json(usuario);
});

router.post('/', (req, res) => {
    const {nome, email, senha } = req.body;
    if (!nome || !email || !senha) return res.status(400).json({ error: 'Nome, email e senha obrigatórios' });
    const novoUsuario = {id: proximoId++, nome, email, senha};
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idx = usuarios.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Usuario não encontrado' });
    usuarios[idx] = { ...usuarios[idx], ...req.body, id };
    res.json(usuarios[idx]);
});

router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const idx = usuarios.findIndex(u => u.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Usuario não encontrado' });
    const usuarioRemovido = usuarios.splice(idx, 1)[0];
    res.json({ mensagem: 'Usuario removido', usuario: usuarioRemovido });
});

module.exports = router;
let usuarios = [ { id: 1, nome: "admin", email: "admin@taskflow.com", senha:"1234" } ];

let proximoId = 2;

const usuariosControllers = {
    listar(req, res) {
        const { coluna } = req.query;
        let resultado = usuarios;
        if (coluna) {
            resultado = usuarios.map(usuario => ({ id: usuario.id, nome: usuario.nome, email: usuario.email }));
        }
        res.json(resultado);
    },

    buscarPorId(req, res) {
        const u = usuarios.find(u => u.id === parseInt(req.params.id));
        if (!u) 
            return res.status(404).json({ erro: "Usuário não encontrado" });
        res.json(u);
    },

    criar(req, res) {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) return res.status(400).json({ erro: "Usuario invalido" });
        const novoUsuario = { id: proximoId++, nome, email, senha };
        usuarios.push(novoUsuario);
        res.status(201).json(novoUsuario);
    },

    atualizar(req, res) {
        const idx = usuarios.findIndex(u => u.id === parseInt(req.params.id));
        if (idx === -1) return res.status(404).json({ erro: "Usuário não encontrado" });
        usuarios[idx] = { ...usuarios[idx], ...req.body, id: usuarios[idx].id };
        res.json(usuarios[idx]);
    },

    remover(req, res) {
        const idx = usuarios.findIndex(u => u.id === parseInt(req.params.id));
        if (idx === -1) return res.status(404).json({ erro: "Usuário não encontrado" });
        const usuarioRemovido = usuarios.splice(idx, 1)[0];
        res.json({ mensagem: "Usuário removido", usuario: usuarioRemovido });
    },
}
module.exports = usuariosControllers;
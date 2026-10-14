const usuarioModel = require('../models/usuario.model');
const tarefaModel  = require('../models/tarefa.model');

const usuariosController = {

  listar: async (req, res) => {
    res.json(await usuarioModel.listar());
  },

  buscarPorId: async (req, res) => {
    const u = await usuarioModel.buscar(parseInt(req.params.id));
    if (!u) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(u);
  },

  criar: async (req, res) => {
    const { nome, email } = req.body;

    if (!nome || !email)
      return res.status(400).json({ erro: 'Nome e email são obrigatórios' });

    if (await usuarioModel.buscarPorEmail(email))
      return res.status(400).json({ erro: 'Email já cadastrado' });

    res.status(201).json(await usuarioModel.adicionar({ nome, email }));
  },

  atualizar: async (req, res) => {
    const atualizado = await usuarioModel.atualizar(parseInt(req.params.id), req.body);
    if (!atualizado) return res.status(404).json({ erro: 'Usuário não encontrado' });
    res.json(atualizado);
  },

  remover: async (req, res) => {
    const id = parseInt(req.params.id);

    if (!await usuarioModel.buscar(id))
      return res.status(404).json({ erro: 'Usuário não encontrado' });

    if (await tarefaModel.contarPorUsuario(id) > 0)
      return res.status(400).json({
        erro: 'Usuário possui tarefas. Remova as tarefas antes de deletar o usuário.',
      });

    const removido = await usuarioModel.remover(id);
    res.json({ mensagem: 'Usuário removido', usuario: removido });
  },

};

module.exports = usuariosController;
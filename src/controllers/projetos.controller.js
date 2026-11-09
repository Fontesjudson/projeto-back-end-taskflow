const criarErro = require('../../utils/criarErro');
const projetoModel = require('../models/projetos.model');
const tarefaModel  = require('../models/tarefa.model');

const projetosController = {

  async listar(req, res) {
    res.json(await projetoModel.listar());
  },

  async resumo(req, res) {
    const projeto = await projetoModel.buscar(parseInt(req.params.id));
    if (!projeto) throw criarErro(404, 'Projeto não encontrado');

    const tarefas = await tarefaModel.listarPorProjeto(projeto.id);

    res.json({
      projeto,
      totalTarefas: tarefas.length,
      porColuna:    tarefaModel.totalPorColuna(tarefas),
    });
  },

  async buscarPorId(req, res) {
    const p = await projetoModel.buscar(parseInt(req.params.id));
    if (!p) throw criarErro(404, 'Projeto não encontrado');
    res.json(p);
  },

  async criar(req, res) {
    const { nome } = req.body;
    if (!nome) throw criarErro(400, 'O campo nome é obrigatório');
    res.status(201).json(await projetoModel.adicionar(req.body));
  },

  async atualizar(req, res) {
    const atualizado = await projetoModel.atualizar(parseInt(req.params.id), req.body);
    if (!atualizado) throw criarErro(404, 'Projeto não encontrado');
    res.json(atualizado);
  },

  async remover(req, res) {
    const id = parseInt(req.params.id);

    if (!projetoModel.buscar(id))
      throw criarErro(404, 'Projeto não encontrado');

    if (tarefaModel.contarPorProjeto(id) > 0)
      throw criarErro(400, 'Projeto possui tarefas associadas. Remova as tarefas antes de deletar o projeto.');

    const removido = await projetoModel.remover(id);
    res.json({ mensagem: 'Projeto removido', projeto: removido });
  },

};

module.exports = projetosController;
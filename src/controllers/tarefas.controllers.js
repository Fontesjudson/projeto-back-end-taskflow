const tarefaModel  = require('../models/tarefa.model');
const criarErro = require('../../utils/criarErro');
const usuarioModel = require('../models/usuario.model');

const PRIORIDADES_VALIDAS = ['alta', 'media', 'baixa'];
const COLUNAS_VALIDAS     = ['afazer', 'andamento', 'concluido'];

const tarefasController = {

  async listar(req, res) {
    const { coluna, usuarioId } = req.query;
    let resultado = await tarefaModel.listar();
    if (coluna)    resultado = resultado.filter(t => t.coluna === coluna);
    if (usuarioId) resultado = resultado.filter(t => t.usuarioId === parseInt(usuarioId));
    res.json(resultado);
  },

  estatisticas(req, res) {
    res.json(tarefaModel.estatisticas(req.query.coluna));
  },

  estatisticasResumo(req, res) {
    res.json({ resumo: tarefaModel.resumo() });
  },

  async buscarPorId(req, res) {
    const tarefa = await tarefaModel.buscar(parseInt(req.params.id));
    if (!tarefa)
      throw criarErro(404, 'Tarefa não encontrada');
    //res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json(tarefa);
  },

  async criar(req, res) {
    const { texto, idprioridade, coluna, usuario_Id, projeto_id, ordem } = req.body;
    console.log('body:', { texto, idprioridade, coluna, usuario_Id, projeto_id, ordem });

    // Validação básica de texto obrigatório (descomente se necessário)
    // if (!texto)
    //   return res.status(400).json({ erro: 'O campo texto é obrigatório' });

    if (coluna === 'andamento' && usuario_Id) {
      const emAndamento = await tarefaModel.contarEmAndamentoPorUsuario(parseInt(usuario_Id));
      if (emAndamento >= 2) {
        throw criarErro(400, 'Limite de 2 tarefas em andamento por usuário atingido');
       // return res.status(400).json({
       //   erro: 'Limite de 2 tarefas em andamento por usuário atingido',
     //   });
      }
    }

    const novaTarefa = await tarefaModel.adicionar(req.body);
    res.status(201).json(novaTarefa);
  },

  async atualizar(req, res) {
    const id = parseInt(req.params.id);
    const { prioridade, coluna, usuarioId } = req.body;

    if (prioridade && !PRIORIDADES_VALIDAS.includes(prioridade))
      return res.status(400).json({ erro: 'Prioridade inválida. Use: alta, media ou baixa' });

    if (coluna && !COLUNAS_VALIDAS.includes(coluna))
      return res.status(400).json({ erro: 'Coluna inválida. Use: afazer, andamento ou concluido' });

    if (coluna === 'andamento' && usuarioId) {
      const emAndamento = await tarefaModel.contarEmAndamentoPorUsuario(parseInt(usuarioId), id);
      if (emAndamento >= 2) {
        return res.status(400).json({
          erro: 'Limite de 2 tarefas em andamento por usuário atingido',
        });
      }
    }

    const atualizada = await tarefaModel.atualizar(id, req.body);
    if (!atualizada) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json(atualizada);
  },

  async remover(req, res) {
    const removida = await tarefaModel.remover(parseInt(req.params.id));
    if (!removida) 
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json({ mensagem: 'Tarefa removida', tarefa: removida });
  },

};

module.exports = tarefasController;


/*const tarefaModel  = require('../models/tarefa.model');
const usuarioModel = require('../models/usuario.model');

const PRIORIDADES_VALIDAS = ['alta', 'media', 'baixa'];
const COLUNAS_VALIDAS     = ['afazer', 'andamento', 'concluido'];

const tarefasController = {

 async listar(req, res) {
    const { coluna, usuarioId } = req.query;
    let resultado = await tarefaModel.listar();
    if (coluna)    resultado = resultado.filter(t => t.coluna === coluna);
    if (usuarioId) resultado = resultado.filter(t => t.usuarioId === parseInt(usuarioId));
    res.json(resultado);
  },

  estatisticas(req, res) {
    res.json(tarefaModel.estatisticas(req.query.coluna));
  },

  estatisticasResumo(req, res) {
    res.json({ resumo: tarefaModel.resumo() });
  },

  async buscarPorId(req, res) {
    const tarefa = await tarefaModel.buscar(parseInt(req.params.id));
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json(tarefa);
  },

 async criar(req, res) {
    const { texto, idprioridade, coluna, usuario_Id, projeto_id, ordem } = req.body;
    console.log('body:', {texto, idprioridade, coluna, usuario_Id, projeto_id, ordem });
    //const dados ={...req.body,usuarioId: req.usuario.id};
  //  if (!texto)
    //  return res.status(400).json({ erro: 'O campo texto é obrigatório' });

   // if (idprioridade && !PRIORIDADES_VALIDAS.includes(idprioridade))
     // return res.status(400).json({ erro: 'Prioridade inválida. Use: alta, media ou baixa' });

    //if (coluna && !COLUNAS_VALIDAS.includes(coluna))
    //  return res.status(400).json({ erro: 'Coluna inválida. Use: afazer, andamento ou concluido' });

   // if (usuario_Id) 
    //   return res.status(400).json({ erro: 'O campo texto é obrigatório' });{
    // if (!usuarioModel.buscar(parseInt(usuario_Id)))
      //  return res.status(400).json({ erro: 'Usuário não encontrado' });

      if (coluna === 'andamento' && await
          tarefaModel.contarEmAndamentoPorUsuario(parseInt(usuario_Id)) >= 2)
        return res.status(400).json({
          erro: 'Limite de 2 tarefas em andamento por usuário atingido',
        });
    

    res.status(201).json(await tarefaModel.adicionar(req.body));
  },

  async atualizar(req, res) {
    const id = parseInt(req.params.id);
    const { prioridade, coluna, usuarioId } = req.body;

    if (prioridade && !PRIORIDADES_VALIDAS.includes(prioridade))
      return res.status(400).json({ erro: 'Prioridade inválida. Use: alta, media ou baixa' });

    if (coluna && !COLUNAS_VALIDAS.includes(coluna))
      return res.status(400).json({ erro: 'Coluna inválida. Use: afazer, andamento ou concluido' });

    if (coluna === 'andamento' && usuarioId) {
      if (tarefaModel.contarEmAndamentoPorUsuario(parseInt(usuarioId), id) >= 2)
        return res.status(400).json({
          erro: 'Limite de 2 tarefas em andamento por usuário atingido',
        });
    }

    const atualizada = tarefaModel.atualizar(id, req.body);
    if (!atualizada) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json(atualizada);
  },

  remover(req, res) {
    const removida = tarefaModel.remover(parseInt(req.params.id));
    if (!removida) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json({ mensagem: 'Tarefa removida', tarefa: removida });
  },

};

module.exports = tarefasController;*/
const tarefaModel  = require('../models/tarefa.model');
const usuarioModel = require('../models/usuario.model');

const PRIORIDADES_VALIDAS = ['alta', 'media', 'baixa'];
const COLUNAS_VALIDAS     = ['afazer', 'andamento', 'concluido'];

const tarefasController = {

  listar(req, res) {
    const { coluna, usuarioId } = req.query;
    let resultado = tarefaModel.listar();
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

  buscarPorId(req, res) {
    const tarefa = tarefaModel.buscar(parseInt(req.params.id));
    if (!tarefa) return res.status(404).json({ erro: 'Tarefa não encontrada' });
    res.json(tarefa);
  },

  criar(req, res) {
<<<<<<< HEAD
<<<<<<< HEAD
    const { texto, prioridade, coluna, usuarioId } = req.body;
<<<<<<< HEAD
    const dados ={...req.body,usuarioId: req.usuario.id};
=======
=======
    const { texto, prioridade, coluna, usuarioId } = req.usuario.id;
>>>>>>> 9d359ef (S11 dia 4 - autenticação jwt e rotas protegidas)

>>>>>>> 421cb10 (MVC S11 dia 2 finalizado)
=======
    const { texto, prioridade, coluna, usuarioId } = req.body;
    const dados ={...req.body,usuarioId: req.usuario.id};
>>>>>>> 8442be0 (.v)
    if (!texto)
      return res.status(400).json({ erro: 'O campo texto é obrigatório' });

    if (prioridade && !PRIORIDADES_VALIDAS.includes(prioridade))
      return res.status(400).json({ erro: 'Prioridade inválida. Use: alta, media ou baixa' });

    if (coluna && !COLUNAS_VALIDAS.includes(coluna))
      return res.status(400).json({ erro: 'Coluna inválida. Use: afazer, andamento ou concluido' });

    if (usuarioId) {
      if (!usuarioModel.buscar(parseInt(usuarioId)))
        return res.status(400).json({ erro: 'Usuário não encontrado' });

      if (coluna === 'andamento' &&
          tarefaModel.contarEmAndamentoPorUsuario(parseInt(usuarioId)) >= 2)
        return res.status(400).json({
          erro: 'Limite de 2 tarefas em andamento por usuário atingido',
        });
    }

<<<<<<< HEAD
<<<<<<< HEAD
    res.status(201).json(tarefaModel.adicionar(dados));
=======
    res.status(201).json(tarefaModel.adicionar(req.body));
>>>>>>> 421cb10 (MVC S11 dia 2 finalizado)
=======
    res.status(201).json(tarefaModel.adicionar(dados));
>>>>>>> 8442be0 (.v)
  },

  atualizar(req, res) {
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

module.exports = tarefasController;
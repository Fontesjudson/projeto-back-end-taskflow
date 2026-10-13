/*let tarefas = [
  { id: 1, texto: 'Estudar Node',   prioridade: 'alta',  coluna: 'afazer',    usuarioId: 1, projetoId: null, concluidaEm: null },
  { id: 2, texto: 'Criar API',      prioridade: 'alta',  coluna: 'andamento', usuarioId: 1, projetoId: null, concluidaEm: null },
  { id: 3, texto: 'Testar Postman', prioridade: 'media', coluna: 'concluido', usuarioId: 1, projetoId: null, concluidaEm: null },
];
let proximoId = 4;*/

const pool = require('../database/db').pool;

module.exports = {

  listar: () => async () => {
    const result = await pool.query('SELECT * FROM tarefas order by id');
    return result.rows;
  },

  buscar: (id) => async () => {
    const result = await pool.query('SELECT * FROM tarefas WHERE id = $1', [id]);
    return result.rows[0] || null;
  },

  listarPorColuna: async (coluna) => {
    const result = await pool.query('SELECT * FROM tarefas WHERE coluna = $1', [coluna]);
    return result.rows;
  },

  listarPorUsuario: async (usuarioId) => {
    const result = await pool.query('SELECT * FROM tarefas WHERE usuarioId = $1', [usuarioId]);
    return result.rows;
  },

  listarPorProjeto: async (projetoId) => {
    const result = await pool.query('SELECT * FROM tarefas WHERE projetoId = $1', [projetoId]);
    return result.rows;
  },

  contarEmAndamentoPorUsuario: async (usuarioId, excluirId) => {
    const result = await pool.query(
      'SELECT COUNT(*) FROM tarefas WHERE usuarioId = $1 AND coluna = $2 AND id != $3',
      [usuarioId, 'andamento', excluirId]
    );
    return parseInt(result.rows[0].count);
  },

  contarPorProjeto: async (projetoId) => {
    const result = await pool.query('SELECT COUNT(*) FROM tarefas WHERE projetoId = $1', [projetoId]);
    return parseInt(result.rows[0].count);
  },

  contarPorUsuario: async (usuarioId) => {
    const result = await pool.query('SELECT COUNT(*) FROM tarefas WHERE usuarioId = $1', [usuarioId]);
    return parseInt(result.rows[0].count);
  },

  totalPorColuna: (lista) => ({
    afazer:    lista.filter(t => t.coluna === 'afazer').length,
    andamento: lista.filter(t => t.coluna === 'andamento').length,
    concluido: lista.filter(t => t.coluna === 'concluido').length,
  }),

  estatisticas: (filtroColuna) => {
    const base = filtroColuna
      ? tarefas.filter(t => t.coluna === filtroColuna)
      : tarefas;
    return {
      total: base.length,
      porColuna: {
        afazer:    base.filter(t => t.coluna === 'afazer').length,
        andamento: base.filter(t => t.coluna === 'andamento').length,
        concluido: base.filter(t => t.coluna === 'concluido').length,
      },
    };
  },

  resumo: () => {
    const total      = tarefas.length;
    const concluidas = tarefas.filter(t => t.coluna === 'concluido').length;
    const andamento  = tarefas.filter(t => t.coluna === 'andamento').length;
    const afazer     = tarefas.filter(t => t.coluna === 'afazer').length;
    const porPrioridade = {
      alta:  tarefas.filter(t => t.prioridade === 'alta').length,
      media: tarefas.filter(t => t.prioridade === 'media').length,
      baixa: tarefas.filter(t => t.prioridade === 'baixa').length,
    };
    const prioridadeDestaque = Object.entries(porPrioridade)
      .sort((a, b) => b[1] - a[1])[0][0];
    return (
      `Você tem ${total} tarefas. ` +
      `${concluidas} concluída(s), ` +
      `${andamento} em andamento e ` +
      `${afazer} a fazer. ` +
      `Prioridade mais comum: ${prioridadeDestaque}.`
    );
  },

  adicionar: async ({ texto, prioridade, coluna, usuarioId, projetoId }) => {
    const result = await pool.query(
      'INSERT INTO tarefas (texto, prioridade, coluna, usuarioId, projetoId) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [texto, prioridade || 'media', coluna || 'afazer', usuarioId || null, projetoId || null]
    );
    return result.rows[0];
  },

  atualizar: async (id, dados) => {
    const { texto, prioridade, coluna, usuarioId } = dados;
    const result = await pool.query(
      'UPDATE tarefas SET texto = $1, prioridade = $2, coluna = $3, usuarioId = $4 WHERE id = $5 RETURNING *', [texto, prioridade, coluna, usuarioId, id]);
    return result.rows[0] || null;

    /*const updateQuery = 'UPDATE tarefas SET texto = $1, prioridade = $2, coluna = $3, usuarioId = $4 WHERE id = $5 RETURNING *';
    const updateValues = [
      dados.texto || tarefa.texto,
      dados.prioridade || tarefa.prioridade,
      dados.coluna || tarefa.coluna,
      dados.usuarioId || tarefa.usuarioId,
      dados.projetoId || tarefa.projetoId,
      dados.concluidaEm,
      id
    ];

    const { rows } = await pool.query(updateQuery, updateValues);
    return rows[0];*/
  },

  remover: async (id) => {
    const result = await pool.query('DELETE FROM tarefas WHERE id = $1 RETURNING *', [id]);
    return result.rows[0] || null;
  },
};
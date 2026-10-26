const pool = require('../database/db').pool;
const prisma = require('../database/prisma');

const incluirNomes = {
  projetos: { select: { nome: true } },
  usuarios: { select: { nome: true } },
};

function formatarTarefa(tarefa) {
  const { projetos, usuarios, ...resto } = tarefa;
  return {
    ...resto,
    projeto: projetos?.nome,
    usuario: usuarios?.nome,
  };
}

module.exports = {

  listar: async () => {
   const lista = await prisma.tarefas.findMany({
    //  includes: incluirNomes,
      texto: true,
      coluna: true,
      ordem: true,
      projeto_id,
      usuario_Id,
      criado_em: true,
      iniciada_em: true,
      concluida_em: null,
      prioridade: {
        select: {
          nome: true
        }
      },
      projetos: {
        select: {
          nome: true
        }
      },
      usuarios: {
        select: {
          nome: true
        }
      },
      orderBy: { id: 'asc' },
    });
    return lista.map(formatarTarefa);
  },

  buscar: async (id) => {
    const result = await prisma.tarefas.findUnique({
      where: { id: id },
      select: {
      texto: true,
      coluna: true,
      ordem: true,
      projeto_id,
      usuario_Id,
      criado_em: true,
      iniciada_em: true,
      concluida_em: null,
      ...tarefajoin
      },
      prioridade: {
        select: {
          nome: true
        }
      },
      projetos: {
        select: {
          nome: true
        }
      },
      usuarios: {
        select: {
          nome: true
        }
      },

      where: { id },
      include: incluirNomes,
    });
   // return tarefa.map(formatarTarefa)
    return tarefa ? formatarTarefa(result) : null;
    //const result = await pool.query('SELECT * FROM tarefas WHERE id = $1', [id]);
   // return result.rows[0] || null;
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

  listarPorPrioridade: async (idprioridade) => {
    const result = await pool.query('SELECT * FROM tarefas WHERE idprioridade = $1', [idprioridade]);
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

  adicionar: async ({ texto, idprioridade, coluna, usuario_Id, projeto_id, ordem }) => {
    const result = await pool.query(
      'INSERT INTO tarefas (texto, prioridade, coluna, usuarioId, projetoId, ordem) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [texto, idprioridade || 2, coluna || 'afazer', usuario_Id, projeto_id, ordem || 0]
    );
    return result.rows[0];
  },

  atualizar: async (id, dados) => {
    const tarefaAtual = await pool.query('SELECT * FROM tarefas WHERE id = $1', [id]);
    const concluidoEm = dados.coluna === 'concluido' ? new Date() : null;
    const iniciadaEm = dados.coluna === 'andamento' 
    && tarefaAtual.rows[0].iniciadaEm === null ? new Date() : tarefaAtual.rows[0].iniciadaEm;
    const result = await pool.query(
      `UPDATE tarefas SET 
      texto = $1, 
      idprioridade = $2,
      coluna = $3, 
      usuarioId = $4, 
      projeto_id = $5, 
      concluidaEm = $6, 
      iniciadaEm = $7
      WHERE id = $8
      RETURNING *`, [dados.texto, dados.idprioridade, dados.coluna, dados.usuarioId, dados.projeto_id, concluidoEm, iniciadaEm, id]);
    return result.rows[0] || null;

  },

  remover: async (id) => {
    const result = await pool.query('DELETE FROM tarefas WHERE id = $1 RETURNING *', [id]);
    return result.rows[0] || null;
  },
};
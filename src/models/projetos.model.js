//const pool = require('../database/db').pool;
const prisma = require('../database/prisma')
const traduzirErroPrisma = require('../../utils/traduzirErroPrisma')

module.exports = {
    listar: async () => {
        const lista = await prisma.projetos.findMany({
            id: true,
            nome: true,
            email: true,
            usuario: {
                select: {
                    nome: true,
                }
            },
            orderBy:{nome:'asc'}
        })
       // const result = await pool.query('SELECT * FROM projetos');
        return (lista);
    },
    buscar: async (id) => {
         const buscar = await prisma.projetos.findUnique({
            id: true,
            nome: true,
            descricao: true,
            usuario_id,
            criado_em,
            usuario: {
                select: {
                    nome: true,
                }
            },
            tarefas: {
               select: {
                id: true,
                texto: true,
               } 
            },
            orderBy:{nome:'asc'}
        })
       // const result = await pool.query('SELECT * FROM projetos');
        return (buscar);

      //  const result = await pool.query('SELECT * FROM projetos WHERE id = $1', [id]);
       // return result.rows[0];
    },
    adicionar: async ({ nome, descriçao }) => {
          const adicionar = await prisma.projetos.findMany({
            id: true,
            nome: true,
            descricao: true,
            usuario_id,
            criado_em,
            usuario: {
                select: {
                    nome: true,
                }
            },
            tarefas: {
               select: {
                id: true,
                texto: true,
               } 
            },
            orderBy:{nome:'asc'}
          })
          return (adicionar)
       // const result = await pool.query('INSERT INTO projetos (nome, descriçao) VALUES ($1, $2) RETURNING *', [nome, descriçao || null]);
       // return result.rows[0];
    },
    atualizar: async (id, dados) => {
        const atualizar = await prisma.projetos.findUnique ({
            nome: true,
            descricao: true,
            usuario_id,
            usuario: {
                select: {
                    nome: true,
                }
            },
            tarefas: {
               select: {
                id: true,
                texto: true,
               } 
            },
            orderBy:{nome:'asc'}
          })
          return (atualizar)
        
       // const result = await pool.query('UPDATE projetos SET nome = $1, descriçao = $2 WHERE id = $3 RETURNING *', [dados.nome || null, dados.descriçao || null, id]);
      //  return result.rows[0] || null;
    },
    remover: async (id) => {
        const remover = await prisma.projetos.findUnique ({
             id: true,
            nome: true,
            descricao: true,
            criado_em,
            orderBy:{nome:'asc'}
          })
          return (remover) || traduzirErroPrisma;
       // const result = await pool.query('DELETE FROM projetos WHERE id = $1 RETURNING *', [id]);
       // return result.rows[0] || null;
    },
    
};
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
        return (buscar);
    },
    adicionar: async ({ nome, descriçao }) => {
          const adicionar = await prisma.projetos.create({
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
    },
    atualizar: async (id, dados) => {
        const atualizar = await prisma.projetos.update({
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
        
    },
    remover: async (id) => {
        try {
        const remover = await prisma.projetos.delete({
             where: { id },
          })
          return (remover) || traduzirErroPrisma;
        } catch (erro) {
          if (erro.code === 'p2025' ) return null;
          throw erro;
  }
 },  
};
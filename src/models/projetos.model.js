//const pool = require('../database/db').pool;
const prisma = require('../database/prisma')
const traduzirErroPrisma = require('../../utils/traduzirErroPrisma')

module.exports = {
    listar: async () => {
        const lista = await prisma.projetos.findMany({
            orderBy:{nome:'asc'}
        })
        return (lista);
    },
    buscar: async (id) => {
         const buscar = await prisma.projetos.findUnique({
            where: { id: id },
        })
        return (buscar);
    },
    adicionar: async ({ dados }) => {
          const adicionar = await prisma.projetos.create({
            data: {
            nome: dados.nome,
            descricao: dados.descriçao || null,
            usuario_id: dados.usuario_id,
            }
          })
          return (adicionar)
        
    },
    atualizar: async (id, dados) => {
        const atualizar = await prisma.projetos.update({
            where: { id: id },
            data: {
            nome: dados.nome || undefined,
            descricao: dados.descricao || undefined,
            usuario_id: dados.usuario_id || undefined,
            }
          })
          return (atualizar)
        
    },
    remover: async (id) => {
        try {
        const remover = await prisma.projetos.delete({
             where: { id: id },
          })
          return (remover) || traduzirErroPrisma;
        } catch (erro) {
          if (erro.code === 'p2025' ) return null;
          throw erro;
  }
 },  
};
const pool = require('../database/db').pool;
const prisma = require('../database/prisma')

module.exports = {
    listar: async () => {
          const listar = await prisma.usuarios.findMany({
            select: {
            id: true,
            nome: true,
            email: true,
            senha: true,
            projetos: {
                select: {
                    id: true,
                    nome: true,
                }
            },
            tarefas: {
                select: {
                    id: true,
                    texto: true,
                }
            }
        }
        });
        return (listar);
    },
    buscar: async (id) => {
        const buscar = await prisma.usuarios.findUnique({
            where: { id },
            select: {
            nome: true,
            email: true,
            projetos: {
                    id: true,
                    nome: true,
            },
            tarefas: {
                    id: true,
                    texto: true,
            }
        }
        });
       return buscar ? (buscar): null;
  
    },
    buscarPorEmail: async (email) => {
          const buscarEmail = await prisma.usuarios.findUnique({
            where: { email },
            select: {
            id: true,
            nome: true,
        }
        });
        return (buscarEmail);

    },
    adicionar: async ({ nome, email, senha }) => {
          const adicionar = await prisma.usuarios.create({
            where: { id },
            data: {
            nome: nome.dados,
            email: email.dados,
            senha: senha.dados,
            }
        });
        return (adicionar);
     
    },

    atualizar: async (id, dados) => {
          const atualizar = await prisma.usuarios.update({
            where: { id },
            data: {
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha,
            }
        });
        return (atualizar);
      
    },

    remover: async (id) => {
        try {
          const remover = await prisma.usuarios.delete({
            where: { id }
        });
        return (remover);
    }  catch (erro) {
    if (erro.code === 'p2025' ) return null;
    throw erro;
  }
 },
};
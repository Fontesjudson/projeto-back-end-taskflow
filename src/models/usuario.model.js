const pool = require('../database/db').pool;
const prisma = require('../database/prisma')

module.exports = {
    listar: async () => {
          const listar = await prisma.usuarios.findMany({
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
        });
        return (listar);
    },
    buscar: async (id) => {
        const buscar = await prisma.usuarios.findUnique({
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
        });
        return (buscar);
    },
    buscarPorEmail: async (email) => {
          const buscarEmail = await prisma.usuarios.findUnique({
            id: true,
            nome: true,
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
        });
        return (buscarEmail);


       // const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
      //  return result.rows[0];
    },
    adicionar: async ({ nome, email, senha }) => {
          const adicionar = await prisma.usuarios.create({
            where: { id },
            nome: true,
            email: true,
            senha: true,
           
        });
        return (adicionar);
     
    },

    atualizar: async (id, dados) => {
          const atualizar = await prisma.usuarios.update({
            where: { id },
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha,
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
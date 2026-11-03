//const db = require('../database/db');
const prisma = require('../database/prisma')

const prioridadeModel = {
    listar: async () => {
        const resultado = await prisma.prioridades.findMany({
          where: { ativo: true },
          select: { id: true, descricao: true },
          orderBy: { id: 'asc' },
   });
   return resultado;
  }
};
module.exports = prioridadeModel;
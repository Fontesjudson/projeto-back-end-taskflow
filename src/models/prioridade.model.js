const db = require('../database/db');

const prioridadeModel = {
    listar: async () => {
        const resultado = await db.query('SELECT id, nome FROM prioridades order by id');
        return resultado.rows;
    }
};
module.exports = prioridadeModel;
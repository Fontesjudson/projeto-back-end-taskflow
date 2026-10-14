/*let projetos = [ { id: 1, nome: 'projeto', descriçao: "teste" } ];
let proximoId = 2;*/

const pool = require('../database/db').pool;

module.exports = {
    listar: async () => {
        const result = await pool.query('SELECT * FROM projetos');
        return result.rows;
    },
    buscar: async (id) => {
        const result = await pool.query('SELECT * FROM projetos WHERE id = $1', [id]);
        return result.rows[0];
    },
    adicionar: async ({ nome, descriçao }) => {
        const result = await pool.query('INSERT INTO projetos (nome, descriçao) VALUES ($1, $2) RETURNING *', [nome, descriçao || null]);
        return result.rows[0];
    },
    atualizar: async (id, dados) => {
        const result = await pool.query('UPDATE projetos SET nome = $1, descriçao = $2 WHERE id = $3 RETURNING *', [dados.nome || null, dados.descriçao || null, id]);
        return result.rows[0] || null;
    },
    remover: async (id) => {
        const result = await pool.query('DELETE FROM projetos WHERE id = $1 RETURNING *', [id]);
        return result.rows[0] || null;
    },
};
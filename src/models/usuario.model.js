/*let usuarios = [ { id: 1, nome: "Alice", email: "alice@email.com", senha:"123456" } ];
let proximoId = 2;*/

const pool = require('../database/db').pool;

module.exports = {
    listar: async (id) => {
        const result = await pool.query('SELECT * FROM usuarios', [id]);
        return result.rows;
    },
    buscar: async (id) => {
        const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        return result.rows[0];
    },
    buscarPorEmail: async (email) => {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        return result.rows[0];
    },
    adicionar: async ({ nome, email, senha }) => {
        const result = await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *', [nome, email, senha]);
        return result.rows[0];
    },

    atualizar: async (id, dados) => {
        const result = await pool.query('UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *', [dados.nome || null, dados.email || null, dados.senha || null, id]);
        return result.rows[0] || null;
    },

    remover: async (id) => {
        const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
        return result.rows[0] || null;
    }
};
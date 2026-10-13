/*let usuarios = [ { id: 1, nome: "Alice", email: "alice@email.com", senha:"123456" } ];
let proximoId = 2;*/

const pool = require('../database/db').pool;

module.exports = {
    listar: async () => {
        const { rows } = await pool.query('SELECT * FROM usuarios');
        return rows;
    },
    buscar: async (id) => {
        const { rows } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        return rows[0];
    },
    buscarPorEmail: async (email) => {
        const { rows } = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        return rows[0];
    },
    adicionar: async ({ nome, email, senha }) => {
        const { rows } = await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *', [nome, email, senha]);
        return rows[0];
    },

    atualizar: async (id, dados) => {
        const { rows } = await pool.query('UPDATE usuarios SET nome = $1, email = $2, senha = $3 WHERE id = $4 RETURNING *', [dados.nome || null, dados.email || null, dados.senha || null, id]);
        return rows[0] || null;
    },

    remover: async (id) => {
        const { rows } = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
        return rows[0] || null;
    }
};
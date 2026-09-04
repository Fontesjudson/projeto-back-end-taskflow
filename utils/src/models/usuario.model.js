let usuarios = [ { id: 1, nome: "admin", email: "admin@taskflow.com", senha: "1234" } ];
let proximoId = 2;

module.exports = {
    listar: () => usuarios,
    buscar: (id) => usuarios.find(u => u.id === id),
    buscarPorEmail: (email) => usuarios.find(u => u.email === email),
    adicionar: ({ nome, email, senha }) => {
        const novo = { id: proximoId++, nome, email, senha };
        usuarios.push(novo);
        return novo;
    },

    atualizar: (id, dados) => {
        const idx = usuarios.findIndex(u => u.id === id);
        if (idx === -1) return null;
        usuarios[idx] = { ...usuarios[idx], ...dados, id};
        return usuarios[idx];
    },

    remover: (id) => {
        const idx = usuarios.findIndex(u => u.id === id);
        if (idx === -1) return null;
        return usuarios.splice(idx, 1)[0];
},
};
let usuarios = [ { id: 1, nome: "admin", email: "admin@taskflow.com", senha: "1234" } ];
let proximoId = 2;

module.exports = {
    buscar: (id) => usuarios.find(u => u.id === id),
    listar: () => usuarios,
    criar: ({ nome, email, senha }) => {
        const novo = { id: proximoId++, nome, email, senha };
        usuarios.push(novo);
        return novo;
    }
};
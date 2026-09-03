let projetos = [ { id: 1, descriçao: "teste", ativo: true } ];
let proximoId = 2;

module.exports = {
    listar: () => projetos,
    buscar: (id) => projetos.find(p => p.id === id),
    criar: ({ descriçao, ativo }) => {
        const novo = { id: proximoId++, descriçao, ativo: ativo || false };
        projetos.push(novo);
        return novo;
    }
};
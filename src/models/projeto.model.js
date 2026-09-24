let projetos = [ { id: 1, nome: 'projeto', descriçao: "teste" } ];
let proximoId = 2;

module.exports = {
    listar: () => projetos,
    buscar: (id) => projetos.find(p => p.id === id),
    adicionar: ({ nome, descriçao }) => {
        const novo = { id: proximoId++, nome, descriçao: descriçao || null, };
        projetos.push(novo);
        return novo;
    },
    atualizar: (id, dados) => {
        const idx = projetos.findIndex(p => p.id === id);
        if (idx === -1) return null;
        projetos[idx] = { ...projetos[idx], ...dados, id };
        return projetos[idx];
    },
    remover: (id) => {
        const idx = projetos.findIndex(p => p.id === id);
        if (idx === -1) return null;
        return projetos.splice(idx, 1)[0];
    },
};
const projetosController = require('../controllers/projetos.controllers');

let projetos = [ { id: 1, descriçao: "teste", ativo: true }]

router.get('/', (req, res) => {
    res.json(projetos);
}),

router.get('/:id', (req, res) => {
    const projeto = projetos.find(p => p.id === parseInt(req.params.id));
    if (!projeto) return res.status(404).send('Projeto não encontrado');
    res.json(projeto);
}),

router.post('/', (req, res) => {
    const { descriçao, ativo } = req.body;
    if (!descriçao) return res.status(400).send('Descrição é obrigatória');
    const novoProjeto = { id: projetos.length + 1, nome: `Projeto ${projetos.length + 1}`, descriçao, ativo: ativo || false };
    projetos.push(novoProjeto);
    res.status(201).json(novoProjeto);
});

router.put('/:id', (req, res) => {
    const projeto = projetos.find(p => p.id === parseInt(req.params.id));
    if (!projeto) return res.status(404).send('Projeto não encontrado');
    const { descriçao, ativo } = req.body;
    if (!descriçao) return res.status(400).send('Descrição é obrigatória');
    projeto.nome = `Projeto ${projeto.id}`;

    projeto.descriçao = descriçao;
    projeto.ativo = ativo;
    res.json(projeto);
});

router.delete('/:id', (req, res) => {
    const projetoIndex = projetos.findIndex(p => p.id === parseInt(req.params.id));
    if (projetoIndex === -1) return res.status(404).send('Projeto não encontrado');
    projetos.splice(projetoIndex, 1);
    res.status(204).send();
});

module.exports = router;
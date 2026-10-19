const prioridadeController = {
    listar: async (req, res) => {
        const prioridades = await prioridadeModel.listar();
        res.json(prioridades);
    }
};

module.exports = prioridadeController;
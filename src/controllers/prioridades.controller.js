const prioridadeModel = require('../models/prioridade.model');

const prioridadeController = {
   async listar (req, res) {
        const prioridades = await prioridadeModel.listar();
        res.json(prioridades);
    }
};

module.exports = prioridadeController;
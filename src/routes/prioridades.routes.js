const espress = require('express');
const router = espress.Router();
const prioridadeController = require('../controllers/prioridades.controller');

router.get('/', prioridadeController.listar);
/*router.post('/', prioridadeController.criar);
router.get('/:id', prioridadeController.buscarPorId);
router.put('/:id', prioridadeController.atualizar);
router.delete('/:id', prioridadeController.remover);*/
module.exports = router;
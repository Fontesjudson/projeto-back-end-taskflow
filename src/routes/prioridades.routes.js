const espress = require('express');
const router = espress.Router();
const prioridadeController = require('../controllers/prioridades.controller');

router.get('/', prioridadeController.listar);
module.exports = router;
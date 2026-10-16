const express = require('express');
const router = express.Router();

const validar = require('../middlewares/validar');
const schemas = require('../middlewares/schemas');
const tarefasController = require('../controllers/tarefas.controllers')
//const autenticar = require('../middlewares/autenticar')

router.get('/estatisticas', tarefasController.estatisticas);
router.get('/resumo', tarefasController.estatisticasResumo)

router.get('/', tarefasController.listar);
router.get('/:id', tarefasController.buscarPorId);
router.post('/',  validar(schemas.tarefa), tarefasController.criar);
//router.put('/:id', idValido, validar(schemas.tarefa), controller.atualizar, tarefasController.atualizar);
router.put('/:id', validar(schemas.id, 'params'),
validar(schemas.tarefa), 
tarefasController.atualizar);

router.get('/:id', tarefasController.buscarPorId);

module.exports = router;
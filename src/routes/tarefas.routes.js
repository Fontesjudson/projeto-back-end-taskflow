const express = require('express');
const router = express.Router();

const validar = require('../middlewares/validar');
const schemas = require('../middlewares/schemas');
const tarefasController = require('../controllers/tarefas.controllers');
const idValido = validar(schemas.id, 'params');

//router.get('/estatisticas', tarefasControllera.estatisticas);
//router.get('/resumo', tarefasController.);

router.get('/', tarefasController.listar);
router.post('/',  validar(schemas.tarefa), tarefasController.criar);
router.get('/:id', tarefasController.buscarPorId);
router.put('/:id', idValido, validar(schemas.tarefa), tarefasController.atualizar);
router.delete('/:id', idValido, tarefasController.remover);

module.exports = router;
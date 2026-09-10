const express = require('express');
const router = express.Router();
<<<<<<< HEAD
<<<<<<< HEAD

const validar = require('../middlewares/validar');
const schemas = require('../middlewares/schemas');
const tarefasController = require('../controllers/tarefas.controllers')
//const autenticar = require('../middlewares/autenticar')
=======
=======

const validar = require('../middlewares/validar');
const schemas = require('../middlewares/schemas');
>>>>>>> 489a66a (MVC S11 dia 3 finalizado)
const tarefasController = require('../controllers/tarefas.controller');
>>>>>>> 421cb10 (MVC S11 dia 2 finalizado)

router.get('/estatisticas', tarefasController.estatisticas);
router.get('/resumo', tarefasController.resumo)

router.get('/', tarefasController.listar);
<<<<<<< HEAD
<<<<<<< HEAD
router.post('/',  validar(schemas.usuario), tarefasController.criar);
router.put('/:id', validar(schemas.usuario),tarefasController.atualizar);
router.delete('/:id', tarefasController.remover);

=======
router.post('/', tarefasController.criar);
router.put('/:id', tarefasController.atualizar);
=======
router.post('/', validar(schemas.usuario), usuariosController.criar);
router.put('/:id', validar(schemas.usuario), usuariosController.atualizar);
>>>>>>> 489a66a (MVC S11 dia 3 finalizado)
router.delete('/:id', tarefasController.remover);
>>>>>>> 421cb10 (MVC S11 dia 2 finalizado)
router.get('/:id', tarefasController.buscarPorId);

module.exports = router;
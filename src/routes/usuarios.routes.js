const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const usuariosController = require('../controllers/usuarios.controllers');

const validar = require('../middlewares/validar');
const schemas = require('../middlewares/schemas');

router.get('/', usuariosController.listar);
router.post('/', validar(schemas.usuario), usuariosController.criar);
router.get('/:id', usuariosController.buscarPorId);
router.put('/:id', validar(schemas.usuario), usuariosController.atualizar);
=======
const usuariosController = require('../controllers/usuarios.controller');

router.get('/', usuariosController.listar);
router.post('/', usuariosController.criar);
router.get('/:id', usuariosController.buscarPorId);
router.put('/:id', usuariosController.atualizar);
>>>>>>> 421cb10 (MVC S11 dia 2 finalizado)
router.delete('/:id', usuariosController.remover);

module.exports = router;
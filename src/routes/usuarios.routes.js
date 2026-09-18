const express = require('express');
const router = express.Router();
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 6f4990e (S12 dia 4 finalizado)
const usuariosController = require('../controllers/usuarios.controllers');

const validar = require('../middlewares/validar');
const schemas = require('../middlewares/schemas');
<<<<<<< HEAD

router.get('/', usuariosController.listar);
router.post('/', validar(schemas.usuario), usuariosController.criar);
router.get('/:id', usuariosController.buscarPorId);
router.put('/:id', validar(schemas.usuario), usuariosController.atualizar);
=======
const usuariosController = require('../controllers/usuarios.controller');
=======
>>>>>>> 6f4990e (S12 dia 4 finalizado)

router.get('/', usuariosController.listar);
router.post('/', validar(schemas.usuario), usuariosController.criar);
router.get('/:id', usuariosController.buscarPorId);
<<<<<<< HEAD
router.put('/:id', usuariosController.atualizar);
>>>>>>> 421cb10 (MVC S11 dia 2 finalizado)
=======
router.put('/:id', validar(schemas.usuario), usuariosController.atualizar);
>>>>>>> 6f4990e (S12 dia 4 finalizado)
router.delete('/:id', usuariosController.remover);

module.exports = router;
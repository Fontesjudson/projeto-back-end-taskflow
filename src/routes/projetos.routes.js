const express = require('express');
const router = express.Router();
const projetosController = require('../controllers/projetos.controllers');

router.get('/', projetosController.listar);
router.post('/', projetosController.criar);
router.get('/:id', projetosController.buscarPorId);
router.put('/:id', projetosController.atualizar);
router.delete('/:id', projetosController.remover);

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> 421cb10 (MVC S11 dia 2 finalizado)

const express = require('express');
const router = express.Router();
<<<<<<< HEAD
<<<<<<< HEAD
const authController = require('../middlewares/auth.controller');
=======
const authController = require('../controller/auth.controller');
>>>>>>> 4f76d16 (MVC S11 dia 4 finalizado)
=======
const authController = require('../middlewares/auth.controller');
>>>>>>> 6f4990e (S12 dia 4 finalizado)

router.post('/login', authController.login);

module.exports = router;
const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const authController = require('../middlewares/auth.controller');
=======
const authController = require('../controller/auth.controller');
>>>>>>> 4f76d16 (MVC S11 dia 4 finalizado)

router.post('/login', authController.login);

module.exports = router;
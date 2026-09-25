const express = require('express');
const router = express.Router();
const authController = require('../middlewares/auth.controller');

router.post('/login', authController.login);

module.exports = router;
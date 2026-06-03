const express = require('express');
const router = express.Router();
const { register, login, cambiarPassword } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.put('/cambiar-password', cambiarPassword);

module.exports = router;
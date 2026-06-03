const express = require('express');
const router = express.Router();
const { register, login, cambiarPassword, recuperarPassword, restablecerPassword } = require('../controllers/auth.controller');

router.post('/register', register);
router.post('/login', login);
router.put('/cambiar-password', cambiarPassword);
router.post('/recuperar-password', recuperarPassword);
router.put('/restablecer-password', restablecerPassword);

module.exports = router;
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth.middleware');
//import { getProfile, getOrderHistory } from '../controllers/user.controller';
const { verifyAdmin } = require('../middleware/admin.middleware');
const { inventario } = requiere('../controllers/user.controller')

router.post('/inventario', verifyToken, verifyAdmin, inventario)

module.exports = router;
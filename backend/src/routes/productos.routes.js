const express = require('express');
const router = express.Router();

const { getProductos, obtenerHistorial } = require('../controllers/productos.controller');
router.get('/productos', getProductos);
router.get('/historial/:idCliente', obtenerHistorial);

module.exports = router;
const express = require('express');
const router = express.Router();

const { getProductos, obtenerHistorial, agregarProducto, editarProducto, eliminarProducto } = require('../controllers/productos.controller');
router.get('/productos', getProductos);
router.get('/historial/:idCliente', obtenerHistorial);
router.post('/productos', agregarProducto);
router.put('/productos/:id', editarProducto);
router.delete('/productos/:id', eliminarProducto);

module.exports = router;
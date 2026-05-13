const { createPaypalOrder, capturePaypalOrder } = require('../services/paypal.services');
const db = require('../config/db');

async function createOrder(req, res) {
    console.log("BODY RECIBIDO:", req.body);
    try {
        const { items, subtotal } = req.body;
        if (!items || !Array.isArray(items) || items.length == 0) {
            return res.status(400).json({
                error: 'El carrito esta vacio'
            });
        }
        if (!subtotal || Number(subtotal) <= 0) {
            return res.status(400).json({
                error: 'El subtotal es invalido'
            });
        }
        const order = await createPaypalOrder({ items, subtotal });
        res.status(200).json({
            id: order.id,
            status: order.status
        });
    } catch (error) {
        console.log("Error al crear orden:", error.message);
        res.status(500).json({
            error: 'No se pudo crear la orden',
            detalle: error.message
        });
    }
}

async function captureOrder(req, res) {
    try {
        const { orderId, items, subtotal } = req.body;
        if (!orderId) {
            return res.status(400).json({
                error: 'La ID de la orden es obligatoria'
            });
        }
        const captureData = await capturePaypalOrder(orderId);
        const total = Number(subtotal) * 1.16;
        db.query(`insert into pedidos (order_id, id_cliente, productos_comprados, total) values (?, ?, ?, ?)`, [orderId, 1, items.map(item => item.nombre).join(", "), total.toFixed(2)], (err, result) => {
            if (err) {
                console.error("Error guardando pedido: ", err);
                return res.status(500).json({ error: "Error guardando pedido" });
            }
            return res.status(200).json({
                mensaje: "Pedido guardado correctamente",
                captureData,
                pedidoId: result.insertId
            });
        });
    } catch (error) {
        console.error('Error al capturar la orden: ', error.message);
        res.status(500).json({
            error: 'No se pudo capturar la orden',
            detalle: error.message
        });
    }
}

module.exports = {
    createOrder,
    captureOrder
};
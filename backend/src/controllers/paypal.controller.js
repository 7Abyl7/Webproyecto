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
        const { orderId, id_cliente, items, subtotal } = req.body;
        if (!orderId) {
            return res.status(400).json({ error: 'La ID de la orden es obligatoria' });
        }
        if (!id_cliente) {
            return res.status(400).json({ error: 'Cliente no autenticado' });
        }
        const captureData = await capturePaypalOrder(orderId);
        const total = Number(subtotal) * 1.16;
        const sql = `INSERT INTO pedidos (order_id, id_cliente, productos_comprados, total)VALUES (?, ?, ?, ?)`;
        const [result] = await db.query(sql, [
            orderId,
            id_cliente,
            items.map(item => item.nombre).join(", "),
            total.toFixed(2)
        ]);
        return res.status(200).json({
            mensaje: "Pedido guardado correctamente",
            captureData,
            pedidoId: result.insertId
        });
    } catch (error) {
        console.error('Error al capturar la orden: ', error.message);
        return res.status(500).json({
            error: 'No se pudo capturar la orden',
            detalle: error.message
        });
    }
}

module.exports = {
    createOrder,
    captureOrder
};
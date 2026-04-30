const { createPaypalOrder, capturePaypalOrder } = require('../services/paypal.services');

async function createOrder(req, res) {
    try {
        const { items, total } = req.body;
        if (!items || !Array.isArray(items) || items.length == 0) {
            return res.status(400).json({
                error: 'El carrito esta vacio'
            });
        }
        if (!total || Number(total) <= 0) {
            return res.status(400).json({
                error: 'El total es invalido'
            });
        }
        const order = await createPaypalOrder({ items, total });
        res.status(200).json({
            id: order.id,
            status: order.status
        });
    } catch (error) {
        console.error('Error al crear orden: ', error.message);
        res.status(500).json({
            error: 'No se pudo crear la orden',
            detalle: error.message
        });
    }
}

async function captureOrder(req, res) {
    try {
        const { orderId } = req.body;
        if (!orderId) {
            return res.status(400).json({
                error: 'La ID de la orden es obligatoria'
            });
        }
        const captureData = await capturePaypalOrder(orderId);
        res.status(200).json(captureData);
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
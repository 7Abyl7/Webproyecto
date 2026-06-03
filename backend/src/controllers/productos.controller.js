const db = require('../config/db');

const getProductos = async(req, res) => {
    try {
        const { categoria } = req.query;
        let sql = 'SELECT * FROM productos';
        let parametros = [];
        if (categoria && categoria !== '') {
            const listaCategorias = categoria.split(',').map(c => c.trim());
            sql += ` WHERE categoria IN (${listaCategorias.map(() => '?').join(',')})`;
            parametros = listaCategorias;
        }
        const [resultados] = await db.query(sql, parametros);
        res.json(resultados);
    } catch (error) {
        console.error('DB ERROR getProductos:', error);
        res.status(500).json({
            error: 'Error al obtener productos',
            detalle: error.message
        });
    }
};

const obtenerHistorial = async(req, res) => {
    try {
        const { idCliente } = req.params;
        const [pedidos] = await db.query(`SELECT order_id, total, fecha, productos_comprados FROM pedidos WHERE id_cliente = ? ORDER BY fecha DESC`, [idCliente]);
        res.json(pedidos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al obtener historial' });
    }
};

module.exports = {
    getProductos,
    obtenerHistorial
}
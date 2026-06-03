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

    const [pedidos] = await db.query('SELECT * FROM pedidos WHERE id_cliente = ?', [req.params.idCliente]);
    for (const pedido of pedidos) {
        const nombres = pedido.productos_comprados.split(',').map(p => p.trim());
        const productos = [];
        for (const nombre of nombres) {
            const [rows] = await db.query('SELECT * FROM productos WHERE nombre = ?', [nombre]);
            if (rows.length > 0) {
                productos.push(rows[0]);
            }
        }
        pedido.productos = productos;
    }
    res.json(pedidos);
};

module.exports = {
    getProductos,
    obtenerHistorial
}
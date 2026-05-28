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

module.exports = {
    getProductos
}
const db = require('../config/db');

const getProductos = (req, res) => {
    const { categoria } = req.query;
    let sql = 'SELECT * FROM productos';
    let parametros = [];
    if (categoria && categoria !== '') {
        const listaCategorias = categoria.split(',').map(c => c.trim());
        sql += ` WHERE categoria IN (${listaCategorias.map(() => '?').join(',')})`;
        parametros = listaCategorias;
    }
    db.query(sql, parametros, (error, resultados) => {
        if (error) {
            return res.status(500).json({ error: 'Error al obtener productos' });
        }
        res.json(resultados);
    });
};

module.exports = {
    getProductos
}
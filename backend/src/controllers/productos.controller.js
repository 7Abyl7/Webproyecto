const db = require('../config/db');

const getProductos = (req, res) => {
    const { categoria } = req.query;
    let sql = 'SELECT * FROM productos';
    let parametros = [];
    if (categoria && categoria !== '') {
        sql += " WHERE categoria = ?";
        parametros.push(categoria);
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
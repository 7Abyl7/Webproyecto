import db from '../config/db';

export const getProfile = async(req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.query(`SELECT id, nombre, correo FROM usuarios WHERE id = ?`, [userId]);
        if (rows.length == 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener perfil' });
    }
};

export const getOrderHistory = async(req, res) => {
    try {
        const userId = req.user.id;
        const [rows] = await db.query(`SELECT *FROM pedidos WHERE id_cliente = ? ORDER BY fecha DESC`, [userId]);
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener historial' });
    }
};
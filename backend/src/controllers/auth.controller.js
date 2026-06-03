const db = require('../config/db.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async(req, res) => {
    try {
        const { nombre, correo, password } = req.body;
        const [existingUser] = await db.query(`SELECT * FROM usuarios WHERE correo = ?`, [correo]);
        if (existingUser.length > 0) {
            return res.status(400).json({ mensaje: 'El usuario ya existe' });
        }
        const validator = require('validator');
        if (!validator.isEmail(correo)) {
            return res.status(400).json({ mensaje: 'Correo electrónico inválido' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query(`INSERT INTO usuarios(nombre, correo, password) VALUES (?, ?, ?)`, [nombre, correo, hashedPassword]);
        res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al registrar usuario' });
    }
};

const login = async(req, res) => {
    try {
        const { correo, password } = req.body;
        const [rows] = await db.query(`SELECT * FROM usuarios WHERE correo = ?`, [correo]);
        if (rows.length == 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        const user = rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }
        const token = jwt.sign({ id: user.id, correo: user.correo }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({
            mensaje: 'Login correcto',
            token,
            usuario: {
                id: user.id,
                nombre: user.nombre,
                correo: user.correo
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en login' });
    }
};

const cambiarPassword = async(req, res) => {
    try {
        const { id, passwordActual, passwordNuevo } = req.body;
        const [rows] = await db.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Debes iniciar sesión primero' });
        }
        const user = rows[0];
        const passwordValido = await bcrypt.compare(passwordActual, user.password);
        if (!passwordValido) {
            return res.status(401).json({ mensaje: 'Contraseña actual incorrecta' });
        }
        if (passwordActual === passwordNuevo) {
            return res.status(400).json({ mensaje: 'La nueva contraseña no puede ser igual a la actual' });
        }
        const nuevoHash = await bcrypt.hash(passwordNuevo, 10);
        await db.query('UPDATE usuarios SET password = ? WHERE id = ?', [nuevoHash, user.id]);
        res.json({ mensaje: 'Contraseña actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error al actualizar contraseña' });
    }

};

module.exports = { register, login, cambiarPassword };
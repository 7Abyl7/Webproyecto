const verifyAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ mensaje: 'Usuario no autenticado' });
    }
    if (req.user.id !== 1) {
        return res.status(403).json({ mensaje: 'Acceso denegado' });
    }
    next();
};

module.exports = verifyAdmin;
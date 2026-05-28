require('dotenv').config();
const app = require('./app');
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth.routes');

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
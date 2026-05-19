import express from 'express';
import { PORT } from './config.js';
import pool from './db.js';
import userRoutes from './routes/users.js';

const app = express();

app.get('/', (req, res) => {
    res.send('Hola Mundo!');
});

app.use(userRoutes)

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
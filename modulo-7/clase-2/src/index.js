import express from 'express';
import cors from 'cors';
import { PORT } from './config.js';
import pool from './db.js';
import userRoutes from './routes/users.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRoutes)

app.get('/', (req, res) => {
    res.send('Hola Mundo!');
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
import express from "express";
import cors from 'cors';
import { PORT } from "../src/config.js";
import pool from "./db.js";
import clientesRoutes from "./routes/clientes.js";


const app = express();
app.use(cors());
app.use(express.json());
app.use(clientesRoutes);

app.listen(PORT);
console.log(`Servidor escuchando en el puerto ${PORT}`);

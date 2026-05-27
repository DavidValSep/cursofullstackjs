import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import paisesRoutes from "./routes/paises.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(paisesRoutes);

app.listen(PORT);
console.log(`Servidor escuchando en el puerto ${PORT}`);

import express from "express";
import { PORT } from "./config.js";
import consultasRoutes from "./routes/consultas.js";
import ordenRoutes from "./routes/orden.js";

const app = express();

app.use(express.json());
app.use(consultasRoutes);
app.use(ordenRoutes);

app.listen(PORT);
console.log(`Servidor escuchando en el puerto ${PORT}`);

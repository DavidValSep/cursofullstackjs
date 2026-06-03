import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import paisesRoutes from "./routes/paises.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(paisesRoutes);

app.use((req, res, next) => {
  res.status(404).json({ 
    mensaje: `La ruta [${req.method}] ${req.originalUrl} no fue encontrada en este servidor.` 
  });
});

app.use((err, req, res, next) => {
  console.error("❌ Error interno detectado:", err.message);
  const statusCode = err.status || 500;
  
  res.status(statusCode).json({
    mensaje: statusCode === 444 
      ? "Petición rechazada por el servidor (Parámetros inválidos o conflictivos)." 
      : "Ocurrió un error inesperado en el servidor."
  });
});

app.listen(PORT);
console.log(`Servidor escuchando en el puerto ${PORT}`);

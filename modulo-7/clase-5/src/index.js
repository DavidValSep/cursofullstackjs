import express from "express";
import { sequelize } from "./database/database.js";
import clientesRoutes from "./routes/clientes.js";

const app = express();

app.use(express.json());
app.use(clientesRoutes);

async function main() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida exitosamente.');
        await sequelize.sync({ force: false });
        console.log('Modelos sincronizados con la base de datos.');
        app.listen(3000);
        console.log(`Servidor escuchando en el puerto 3000...`);
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}

main();
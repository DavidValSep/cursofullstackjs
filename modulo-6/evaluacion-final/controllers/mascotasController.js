const fs = require('fs').promises;
const path = require('path');
const dataPath = path.join(__dirname, '../data/mascotas.json');

// Función auxiliar para leer
const readMascotas = async () => {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
};

// GET / - Retorna todos los dueños con sus mascotas
const getAllMascotas = async (req, res) => {
    try {
        const duenos = await readMascotas();
        // Renderizamos la vista enviando el array completo
        res.render('mascotas', { 
            duenos,
            title: "Registro Nacional de Mascotas" 
        });
    } catch (err) {
        console.error("Error al leer mascotas:", err);
        res.status(500).send("Error en el servidor");
    }
};

module.exports = { getAllMascotas };
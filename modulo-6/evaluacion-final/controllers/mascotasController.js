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

const getMascotaById = async (req, res) => {
    try {
        const { id } = req.params;
        const duenos = await readMascotas();
        
        let mascotaEncontrada = null;
        let rutDelDueno = null;

        // Recorremos los dueños para buscar la mascota por ID
        duenos.forEach(dueno => {
            const mascota = dueno.mascotas.find(m => m.id == id);
            if (mascota) {
                mascotaEncontrada = mascota;
                rutDelDueno = dueno.rut_dueno;
            }
        });

        if (mascotaEncontrada) {
            // Retornamos la mascota encontrada y el RUT del dueño
            // Puedes renderizar una vista o enviar un JSON según prefieras
            res.render('detalle-mascota', { 
                mascota: mascotaEncontrada, 
                rut_dueno: rutDelDueno 
            });
        } else {
            res.status(404).render('no-encontrado', { mensaje: "Mascota no encontrada" });
        }
    } catch (err) {
        console.error("Error al buscar mascota:", err);
        res.status(500).send("Error interno del servidor");
    }
};

module.exports = { getAllMascotas, 
    getMascotaById };
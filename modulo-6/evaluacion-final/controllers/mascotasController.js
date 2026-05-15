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

const getMascotaByRut = async (req, res) => {
    try {
        const { rut } = req.params;
        const duenos = await readMascotas();
        
        // Buscamos al dueño por RUT
        const duenoEncontrado = duenos.find(d => d.rut_dueno === rut);

        if (duenoEncontrado) {
            // IMPORTANTE: El nombre de la variable aquí es 'dueno'
            res.render('detalle-dueno', { dueno: duenoEncontrado });
        } else {
            res.status(404).render('no-encontrado', { mensaje: "Dueño no encontrado" });
        }
    } catch (err) {
        res.status(500).send("Error interno");
    }
};

const getAgregarMascota = async (req, res) => {
    res.render('agregar-mascota', { title: "Agregar Mascota" });
};

const postAgregarMascota = async (req, res) => {
    try {
        const { nombre, especie, id, rut_dueno } = req.body;
        const duenos = await readMascotas();

        // Buscamos al dueño por RUT
        let dueno = duenos.find(d => d.rut_dueno === rut_dueno);

        if (!dueno) {
            // Si el dueño no existe, lo creamos
            dueno = {
                nombre_dueno: "Desconocido", // Puedes pedir el nombre del dueño también si quieres
                rut_dueno,
                mascotas: []
            };
            duenos.push(dueno);
        }

        // Agregamos la nueva mascota al dueño encontrado o creado
        dueno.mascotas.push({ nombre, especie, id });

        // Guardamos los cambios en el archivo JSON
        await fs.writeFile(dataPath, JSON.stringify(duenos, null, 2), 'utf-8');

        res.redirect('/mascota/' + id);
    } catch (err) {
        console.error("Error al agregar mascota:", err);
        res.status(500).send("Error en el servidor");
    }
}

module.exports = { getAllMascotas, 
    getMascotaById, getMascotaByRut, getAgregarMascota, postAgregarMascota};
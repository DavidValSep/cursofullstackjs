import Cliente from "../models/clientes.js";

export const getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll();
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los clientes" });
    };
};

export const createCliente = async (req, res) => {
    const { nombre, email } = req.body;
    try {
        const nuevoCliente = await Cliente.create({ nombre, email });
        res.status(201).json(nuevoCliente);
    } catch (error) {
        res.status(500).json({ error: "Error al crear el cliente" });
    };
};
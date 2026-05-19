import { query } from "../db.js"

export const getUsers = async (req, res) => {
    try {
        const result = await query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching users', err);
        res.status(500).send('Error fetching users');
    }
};

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query('SELECT * FROM users WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Usuario no encontrado.');
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send('Error fetching user');
    }
};

export const deleteUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await query('DELETE FROM users WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Usuario no encontrado.');
        }
        res.send('Usuario eliminado.');
    } catch (err) {
        res.status(500).send('Error deleting user');
    }
};

export const createUser = async (req, res) => {
    try {
        const { username, email } = req.body;
        const result = await query('INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *', [username, email]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).send('Error creating user');
    }
};

export const updateUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email } = req.body;
        const result = await query('UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING *', [username, email, id]);
        if (result.rows.length === 0) {
            return res.status(404).send('Usuario no encontrado.');
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).send('Error updating user');
    }
};
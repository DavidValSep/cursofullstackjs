import { Router } from "express";
import { query} from '../db.js';

const router = Router();

router.get('/users', async (req, res) => {
    try {
        const result = await query('SELECT * FROM users');
        res.json(result.rows);
    } catch (err) {
        console.error('Error fetching users', err);
        res.status(500).send('Error fetching users');
    }
});

export default router;
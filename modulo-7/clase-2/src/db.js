import pg from 'pg';
import { DB_CONFIG } from './config.js';

const { Pool } = pg;

const pool = new Pool(DB_CONFIG);

pool.on('connect', () => {
    console.log('Conectado a postgres');
});

pool.on('error', (err) => {
    console.error('Error en la conexión a postgres', err);
});

export const query = (text, params) => pool.query(text, params);

export default pool;
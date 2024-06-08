import mysql from 'mysql2/promise';

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({path: __dirname+'\\..\\.env'});

const config = {
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    database: process.env.DATABASE_DB,
    password: process.env.PASSWORD_DB,
    port: process.env.PORT_DB,
};

let pool;

crearPool();

export async function crearPool() {
    console.log("Creando pool de conexiones a la base de datos");
    try {
        pool = await mysql.createPool({
            ...config,
            connectionLimit: 10, // Ajusta según tus necesidades
        });
        let res = await pool.query('select * from Campus');
        console.log(res);
        console.log("Pool de conexiones creado correctamente");
    } catch (err) {
        console.error("Error al crear pool de conexiones: ", err.message);
    }
}

export function obtenerPool() {
    if (!pool) {
        throw new Error("El pool de conexiones no ha sido creado. Llama primero a crearPool()");
    }
    return pool;
}

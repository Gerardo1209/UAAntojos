import mysql from 'mysql2/promise';

const config = {
    host: process.env.DB_HOST || 'uaaantojos.femat.dev',
    user: process.env.DB_USER || 'gerardo',
    database: process.env.DB_NAME || 'UaanojosFederada',
    password: process.env.DB_PASSWORD || 'FDelgadoG1209M#',
    port: process.env.DB_PORT || '3306',
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
        console.log("Pool de conexiones creado correctamente");
    } catch (err) {
        console.error("Error al crear pool de conexiones: ", err);
    }
}

export function obtenerPool() {
    if (!pool) {
        throw new Error("El pool de conexiones no ha sido creado. Llama primero a crearPool()");
    }
    return pool;
}

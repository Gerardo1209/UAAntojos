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
            typeCast: function castField( field, useDefaultTypeCasting ) {

                // We only want to cast bit fields that have a single-bit in them. If the field
                // has more than one bit, then we cannot assume it is supposed to be a Boolean.
                if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {
        
                    var bytes = field.buffer();
        
                    // A Buffer in Node represents a collection of 8-bit unsigned integers.
                    // Therefore, our single "bit field" comes back as the bits '0000 0001',
                    // which is equivalent to the number 1.
                    return( bytes[ 0 ] === 1 );
        
                }
        
                return( useDefaultTypeCasting() );
        
            }
        });
        /*let res = await pool.query('CALL api_spGet_consultarCampusActivos();');
        console.log(res[0]);*/
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

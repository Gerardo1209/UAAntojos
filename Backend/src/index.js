import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const config = {
    host: process.env.DB_HOST || 'uaaantojos.femat.dev',
    user: process.env.DB_USER || 'gerardo',
    database: process.env.DB_NAME || 'UaantojosFederada',
    password: process.env.DB_PASSWORD || 'FDelgadoG1209M#',
    port: process.env.DB_PORT || '3306'
};
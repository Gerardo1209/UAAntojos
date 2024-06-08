import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { obtenerPoolConsult, obtenerPoolUpdate } from '../sql/connection.js';


const app = express();
app.use(compression());
app.use(express.urlencoded({extended:false}));
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Servidor escuhando en el puerto " + port);
})
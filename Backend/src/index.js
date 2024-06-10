import express from 'express';
import compression from 'compression';
import cors from 'cors';

import routerApi from './routes/routes.js';

const app = express();
app.use(compression());
app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/', routerApi);

app.get('/test', async(req,res)=> {
    res.send("Hola");
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Servidor escuhando en el puerto " + port);
})
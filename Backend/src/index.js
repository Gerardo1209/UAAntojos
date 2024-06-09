import express from 'express';
import compression from 'compression';
import cors from 'cors';
import { obtenerPoolConsult, obtenerPoolUpdate } from '../sql/connection.js';
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
app.post('/login', async(req, res) => {
    try{
        console.log(req.body)
        const pool = await obtenerPoolUpdate();
        const result = await pool.query('CALL api_spGet_autenticacionUsuario(?,?,?)',[req.body.correo,req.body.contra,req.body.token]);
        console.log(result);
        if(result[0][0][0]){
            res.send({success: true, data:result[0][0]});
        }else{
            throw new Error("Hubo un error en login");
        }
        
    }catch(err){
        res.send({success: false, data:err.message});
    }
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Servidor escuhando en el puerto " + port);
})
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendedor } from '../models/vendedor.model';
import { ResponseObject } from '../models/response.model';
import { AlertService } from './alert.service';
import { usuarioLogin } from '../models/cliente.model';
import { Comercio } from '../models/comercio.model';
import { EdificioCampus } from '../models/edificioCampus.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURL: string = "http://localhost:3000/api"

  constructor(
    private httpClient:HttpClient,
    private alertService:AlertService
  ) { }

  async getVendedores():Promise<Vendedor[]>{
    let vendedores: Vendedor[] = [];
    try{
      await (<Observable<ResponseObject<Vendedor[]>>> this.httpClient.get(this.baseURL + "/vendedor/activos"))
      .forEach(res => {
        if(res.success && typeof res.data == 'object'){
          vendedores = res.data;
        }else{
          this.alertService.error("Error al obtener los vendedores");
        }
      });
    }catch(err){
      console.error(err);
      
      //this.alertService.error(err);
    }
    return vendedores;
  }

  async getComercios():Promise<Comercio[]>{
    let comercio: Comercio[] = [];
    try{
      await (<Observable<ResponseObject<Comercio[]>>> this.httpClient.get(this.baseURL + "/comercio/activos"))
      .forEach(res => {
        if(res.success && typeof res.data == 'object'){
          comercio = res.data;
        }else{
          this.alertService.error("Error al obtener los comercios");
        }
      });
    }catch(err){
      console.error(err);
      //this.alertService.error(err);
    }
    return comercio;
  }

  async getEdificioComercio(idComercio:number):Promise<EdificioCampus>{
    let edifico: EdificioCampus = {idCampus: 0, IdCreador: 0, idEdificio: 0, E_Activos: false, Latitud: '', Longitud: '', Nombre: '', Numero: ''};
    try{
      await (<Observable<ResponseObject<EdificioCampus>>> this.httpClient.get(this.baseURL + "/comercio/edificio/"+idComercio))
      .forEach(res => {
        if(res.success && typeof res.data == 'object'){
          edifico = res.data;
        }else{
          this.alertService.error("Error al obtener el edificio");
        }
      });
    }catch(err){
      console.error(err);
      //this.alertService.error(err);
    }
    return edifico;
  }

  login(correo:string, contra:string,token:string="token100%realnofake" ):Observable<any>{
    return this.httpClient.post<usuarioLogin>(this.baseURL+"/login", { correo, contra, token });
  }
}

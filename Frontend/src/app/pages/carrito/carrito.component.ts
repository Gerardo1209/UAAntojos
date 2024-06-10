import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { MetodoPago } from '../../models/metodoPago.model';
import { CrearPedidoModel } from '../../models/crearPedidoModel';
import { Producto } from '../../models/producto.model';

/*interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  vendedor: string;
  precio: number;
  cantidad: number;
}*/

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito: Producto[] = [];
  total: number = 0;
  metodoPago:MetodoPago[] = [];
  tipoPago!:MetodoPago;

  public idPedido : number = 0;
  constructor(private httpClient:HttpService) { }

  ngOnInit(): void {
    this.cargarCarrito();
    this.calcularTotal();
    this.obtenerMetodoPago();
  }

  async obtenerMetodoPago(){
    this.metodoPago = await this.httpClient.getMetodoPago()
  }

  cargarCarrito(): void {
    this.carrito = JSON.parse(sessionStorage.getItem('cart') || '[]');
  }

  calcularTotal(): void {
    this.total = this.carrito.reduce((acc, producto) => acc + (producto.Precio * producto.cantidad), 0);
  }

  eliminarProducto(producto: Producto): void {
    this.carrito = this.carrito.filter(p => p.id !== producto.id);
    sessionStorage.setItem('cart', JSON.stringify(this.carrito));
    this.calcularTotal();
    Swal.fire({
      title: 'Producto eliminado',
      text: `${producto.Nombre} ha sido eliminado del carrito.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }

  vaciarCarrito(): void {
    this.carrito = [];
    sessionStorage.removeItem('cart');
    this.calcularTotal();
    Swal.fire({
      title: 'Carrito vaciado',
      text: 'Todos los productos han sido eliminados del carrito.',
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
  cambiarPago(tipo:MetodoPago){
    this.tipoPago = tipo;
  }

  pagarCarritos(){
    let user
    let locData
    let token = 'token100%realnofake'
    let location = sessionStorage.getItem('locacion');
    let lat !: string;
    let lng !: string;
    if (location){
      locData = JSON.parse(location);
      lat = locData.lat;
      lng = locData.lng;
    }else{
      lat = '21.9419';
      lng = '-102.2756'
    }
    let dataUser = localStorage.getItem('usr');
    var crearPedido!: CrearPedidoModel;
    let idComercio !: number;
    let idCliente !: number;
    let Latitud !: string
    if (dataUser){
      user = JSON.parse(dataUser);
      idCliente = user.id;
      Latitud = user.Latitud
    }
    idCliente = this.carrito[0].IdComercio
    crearPedido = {
      IdCliente : idCliente,
      IdComercio : idComercio,
      IdMetodoPago : this.tipoPago.id,
      Latitud : lat,
      Longitud :lng,
      Token : token
    }
    console.log(crearPedido);
    
    this.httpClient.postCreateOrder(crearPedido).subscribe(response =>{
      console.log(response);
    })
  }
}

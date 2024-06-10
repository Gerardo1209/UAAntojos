import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { MetodoPago } from '../../models/metodoPago.model';
import { CrearPedidoModel } from '../../models/pedido.model';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  vendedor: string;
  precio: number;
  cantidad: number;
}

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
    this.total = this.carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
  }

  eliminarProducto(producto: Producto): void {
    this.carrito = this.carrito.filter(p => p.id !== producto.id);
    sessionStorage.setItem('cart', JSON.stringify(this.carrito));
    this.calcularTotal();
    Swal.fire({
      title: 'Producto eliminado',
      text: `${producto.nombre} ha sido eliminado del carrito.`,
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
    var crearPedido: CrearPedidoModel;


  }
}

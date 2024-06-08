import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  

@Component({
  selector: 'app-carrito',
  standalone: true, 
  imports: [CommonModule],  
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  carrito = [
    { nombre: 'Pan Integral', precio: 25, cantidad: 2 },
    { nombre: 'Manzana', precio: 10, cantidad: 5 },
    { nombre: 'Carne de Res', precio: 100, cantidad: 1 },
    { nombre: 'Pescado', precio: 80, cantidad: 3 },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  realizarCompra(): void {
    console.log('Compra realizada:', this.carrito);
    alert('Compra realizada con éxito');
  }

  calcularTotal(): number {
    return this.carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
  }
}

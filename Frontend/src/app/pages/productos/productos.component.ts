import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-productos',
  standalone: true,  
  imports: [CommonModule],  
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  productos = [
    { nombre: 'Pan Integral', precio: 25, categoria: 'Panadería' },
    { nombre: 'Manzana', precio: 10, categoria: 'Frutería' },
    { nombre: 'Carne de Res', precio: 100, categoria: 'Carnicería' },
    { nombre: 'Pescado', precio: 80, categoria: 'Pescadería' },
    { nombre: 'Zanahoria', precio: 5, categoria: 'Verdulería' },
    { nombre: 'Leche', precio: 20, categoria: 'Abarrotes' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addToCart(product: any): void {
    console.log('Añadido al carrito:', product);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ProductosComponent implements OnInit {
  products: Product[] = [
    { id: 1, name: 'Producto 1', description: 'Descripción del producto 1', price: 100.00, quantity: 1 },
    { id: 2, name: 'Producto 2', description: 'Descripción del producto 2', price: 150.00, quantity: 1 },
    { id: 3, name: 'Producto 3', description: 'Descripción del producto 3', price: 200.00, quantity: 1 }
  ];

  constructor() { }

  ngOnInit(): void { }

  addToCart(product: Product): void {
    let cart: Product[] = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const index = cart.findIndex(p => p.id === product.id);

    if (index !== -1) {
      cart[index].quantity += 1; // Incrementar cantidad si el producto ya está en el carrito
    } else {
      cart.push({ ...product }); // Agregar producto al carrito
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} ha sido añadido al carrito.`);
  }
}

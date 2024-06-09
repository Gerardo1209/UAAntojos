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
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CarritoComponent implements OnInit {
  cart: Product[] = [];

  ngOnInit(): void {
    this.cart = this.getCart();
  }

  getCart(): Product[] {
    return JSON.parse(sessionStorage.getItem('cart') || '[]');
  }

  removeFromCart(productId: number): void {
    let cart: Product[] = JSON.parse(sessionStorage.getItem('cart') || '[]');
    cart = cart.filter(product => product.id !== productId);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    this.cart = cart;
  }

  clearCart(): void {
    sessionStorage.removeItem('cart');
    this.cart = [];
  }
}

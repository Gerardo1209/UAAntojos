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
  total: number = 0;

  ngOnInit(): void {
    this.cart = this.getCart();
    this.calculateTotal();
  }

  getCart(): Product[] {
    return JSON.parse(sessionStorage.getItem('cart') || '[]');
  }

  removeFromCart(productId: number): void {
    let cart: Product[] = JSON.parse(sessionStorage.getItem('cart') || '[]');
    cart = cart.filter(product => product.id !== productId);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    this.cart = cart;
    this.calculateTotal();
  }

  clearCart(): void {
    sessionStorage.removeItem('cart');
    this.cart = [];
    this.total = 0;
  }

  calculateTotal(): void {
    this.total = this.cart.reduce((acc, product) => acc + (product.price * product.quantity), 0);
  }
}

import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Categoria } from '../../models/categoria.model';
import { HttpService } from '../../services/http.service';
import { Producto } from '../../models/producto.model';
import { Vendedor } from '../../models/vendedor.model';


/*interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  categoria: string;
  vendedor: string;
  precio: number;
  cantidad: number;
}*/

interface Key{
    id: number;
    display:string;
}

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  /*productos: Producto[] = [
    { id: 1, nombre: 'Pan', descripcion: 'Pan fresco de la panadería.', categoria: 'Alimentos', vendedor: 'Panadería La Esperanza', precio: 30, cantidad: 1 },
    { id: 2, nombre: 'Manzanas', descripcion: 'Manzanas frescas y jugosas.', categoria: 'Frutas', vendedor: 'Frutería El Paraíso', precio: 50, cantidad: 1 },
    { id: 3, nombre: 'Carne', descripcion: 'Carne de res de primera calidad.', categoria: 'Carnes', vendedor: 'Carnicería Don Juan', precio: 100, cantidad: 1 },
    { id: 4, nombre: 'Pescado', descripcion: 'Pescado fresco del día.', categoria: 'Pescados', vendedor: 'Pescadería La Ola', precio: 80, cantidad: 1 },
    { id: 5, nombre: 'Lechuga', descripcion: 'Lechuga fresca y crujiente.', categoria: 'Verduras', vendedor: 'Verdulería San José', precio: 20, cantidad: 1 },
    { id: 6, nombre: 'Arroz', descripcion: 'Arroz de grano largo.', categoria: 'Granos', vendedor: 'Tienda de Abarrotes Doña Rosa', precio: 25, cantidad: 1 },
  ];*/

  

  criterioOrdenacion = 'categoria';
  valorOrdenacion = '';
  valores: Key[] = [];
  productosFiltrados: Producto[] = [];

  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.actualizarValores();
    this.ordenarProductos();
  }

  categorias:Categoria[] = [];
  async getCategorias(){
    this.categorias = await this.httpService.getCategorias();
  }

  productos:Producto[] = [];
  async getProductos(){
    this.productos = await this.httpService.getProductosActivos();
  }

  vendedores:Vendedor[] = [];
  async getVendedores(){
    this.vendedores = await this.httpService.getVendedores();
  }

  actualizarValores() {
    if (this.criterioOrdenacion === 'categoria') {
      this.valores = [...new Set(this.categorias.map(p => {id: p.,display: p.Nombre}))];
    } else if (this.criterioOrdenacion === 'vendedor') {
      this.valores = [...new Set(this.vendedores.map(p => p.NombreComercio))];
    }
    this.valorOrdenacion = this.valores[0];
    this.ordenarProductos();
  }

  ordenarProductos() {
    if (this.criterioOrdenacion === 'categoria') {
      this.productosFiltrados = this.productos.filter(p => p.categoria === this.valorOrdenacion);
    } else if (this.criterioOrdenacion === 'vendedor') {
      this.productosFiltrados = this.productos.filter(p => p.vendedor === this.valorOrdenacion);
    }
  }

  anadirAlCarrito(producto: Producto): void {
    let cart: Producto[] = JSON.parse(sessionStorage.getItem('cart') || '[]');
    const index = cart.findIndex(p => p.id === producto.id);

    if (index !== -1) {
      cart[index].cantidad += 1;
    } else {
      cart.push({ ...producto });
    }

    sessionStorage.setItem('cart', JSON.stringify(cart));
    Swal.fire({
      title: '¡Añadido!',
      text: `${producto.nombre} ha sido añadido al carrito.`,
      icon: 'success',
      confirmButtonText: 'OK'
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  standalone: true,  
  imports: [CommonModule],  
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.css'],
  
})
export class VendedoresComponent implements OnInit {
  vendedores = [
    { nombre: 'Panadería La Esperanza', ubicacion: 'Centro', ventas: 120 },
    { nombre: 'Frutería El Paraíso', ubicacion: 'Norte', ventas: 80 },
    { nombre: 'Carnicería Don Juan', ubicacion: 'Sur', ventas: 150 },
    { nombre: 'Pescadería La Ola', ubicacion: 'Oeste', ventas: 90 },
    { nombre: 'Verdulería San José', ubicacion: 'Este', ventas: 110 },
    { nombre: 'Tienda de Abarrotes Doña Rosa', ubicacion: 'Centro', ventas: 130 },
  ];

  constructor() { }

  ngOnInit(): void {
    console.log(this.vendedores); 
  }
}

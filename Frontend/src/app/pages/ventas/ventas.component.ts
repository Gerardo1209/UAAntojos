import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../shared/loading/loading.component';
import { RouterModule } from '@angular/router';

interface Sale {
  id: number;
  product: string;
  date: string;
  amount: number;
  buyer: string;
}

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css'],
  standalone: true,
  imports: [CommonModule, LoadingComponent, RouterModule]
})
export class VentasComponent implements OnInit {
  isVendor: boolean = true; // Cambiar según sea necesario
  sales: Sale[] = [
    { id: 1, product: 'Producto 1', date: '2024-01-01', amount: 100, buyer: 'Cliente A' },
    { id: 2, product: 'Producto 2', date: '2024-02-01', amount: 150, buyer: 'Cliente B' },
    { id: 3, product: 'Producto 3', date: '2024-03-01', amount: 200, buyer: 'Cliente C' }
  ];

  constructor() { }

  ngOnInit(): void { }

  cancelSale(saleId: number): void {
    this.sales = this.sales.filter(sale => sale.id !== saleId);
  }
}

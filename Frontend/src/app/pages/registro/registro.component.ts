import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegistroComponent {
  role: 'vendedor' | 'cliente' | null = null;
  registroData = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
    contrasena: ''
  };
  confirmarContrasena = '';
  passwordMismatch = false;

  selectRole(role: 'vendedor' | 'cliente') {
    this.role = role;
  }

  onSubmit() {
    if (this.registroData.contrasena !== this.confirmarContrasena) {
      this.passwordMismatch = true;
      return;
    }
    this.passwordMismatch = false;
    // logica para poder enviar datos a un server
    console.log('Datos de registro:', this.registroData);
  }
}

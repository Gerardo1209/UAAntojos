export interface Cliente {
    id: number;
    Nombres: string;
    ApPaterno: string;
    ApMaterno: string;
    Correo: string;
    Contrasena: string;
    Activo: boolean;
    modification_time: Date;
    insertion_time: Date;
    token: string;
}
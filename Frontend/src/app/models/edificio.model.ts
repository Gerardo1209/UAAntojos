export interface Edificio {
    id: number;
    Numero: string;
    Longitud: string;
    Latitud: string;
    Activo: boolean;
    IdCreador: number;
    modification_time: Date;
    insertion_time: Date;
    Campus_idCampus: number;
}
export interface Pedido {
    id: number;
    IdCliente: number;
    IdComercio: number;
    IdMetodoPago: number;
    EstadoPedido: boolean;
    Longitud: string;
    Latitud: string;
    modification_time: Date;
    insertion_time: Date;
    FechaEntregado: Date;
    tokenSesion: string;
}

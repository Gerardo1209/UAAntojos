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

export interface CrearPedidoModel{
    IdCliente       : number
    IdComercio      : number
    IdMetodoPago    : number
    Latitud         : string
    Longitud        : string
    Token           : string
}

export interface CrearDetallePedido{
    IdPedido        : number
    IdProducto      : number
    Cantidad        : number
}
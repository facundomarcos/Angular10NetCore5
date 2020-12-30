export interface Coordenada{
    latitud: number;
    longitud: number;
    
}

//para mostrar el nombre del cine en pantalla
export interface CoordenadaConMensaje extends Coordenada{
    mensaje: string;
}
//para leer el actor
export interface actorDTO {
    id: number;
    nombre: string;
    fechaNacimiento: Date;
    foto: string;
    biografia: string;
}
//para crear actor
export interface actorCreacionDTO {
    nombre: string;
    fechaNacimiento: Date;
    foto: File;
    biografia: string;
}
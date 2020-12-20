//para leer el actor
export interface actorDTO {
    nombre: string;
    fechaNacimiento: Date;
    foto: string;
}
//para crear actor
export interface actorCreacionDTO {
    nombre: string;
    fechaNacimiento: Date;
    foto: File;
}
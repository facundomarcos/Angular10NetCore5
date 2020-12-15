import { AbstractControl, ValidatorFn } from "@angular/forms";

export function primeraLetraMayuscula(): ValidatorFn {
    return (control: AbstractControl) => {
        const valor = <string>control.value;
        if (!valor) return null;
        if (valor.length === 0) return null;

    const primeraLetra = valor[0];
    if (primeraLetra !== primeraLetra.toUpperCase()){
        return {
            primeraLetraMayuscula: {
                mensaje: 'La primera letra debe ser mayúscula'
            }
        };
    }
    return null;
    }
}
//nota, por algun motivo en el video no le sale error cuando pone return solo,
//puse return null y compila bien
export function toBase64(file: File){
    //un Promise es una funcion que nos asegura que va a retornar algo cuando 
    //termine de ejecutarse en un futuro
    return new Promise((resolve, reject) =>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })
}
//funcion para iterar los errores y especificar en que campo estan
export function parsearErroresAPI(response: any): string[]{
    const resultado: string[] = [];

    if(response.error){
        if(typeof response.error === 'string'){
            resultado.push(response.error);
        }else{
            const mapaErrores = response.error.errors;
            const entradas = Object.entries(mapaErrores);
            entradas.forEach((arreglo: any[]) => {
                const campo = arreglo[0];
                arreglo[1].forEach(mensajeError => {
                    resultado.push(`${campo}: ${mensajeError}`);
                });
            })
        }
    }
    return resultado;
}

export function formatearFecha(date: Date){
    //esto es en caso que la fecha venga con otro formato del web api
    date = new Date(date);
    const formato= new Intl.DateTimeFormat('en', {
        year:'numeric',
        //2 digit marca error al guardar
        month: '2-digit',
        day: '2-digit',
    });
    const [
        {value: month},,
        {value: day},,
        {value: year}
    ] = formato.formatToParts(date);
    
    return `${year}-${month}-${day}`;
    
}
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
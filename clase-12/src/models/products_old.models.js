import fs from 'fs';
import path from "path"
const __dirname = import.meta.dirname;
import datos from "../data/data.json" with {type: "json"}
console.log(datos)

const dataPath = path.join(__dirname, '../data/data.json');

export async function getProducts() {
    try {
        // Ahora sí podemos usar await directamente
        const data = await fs.readFile(dataPath, 'utf8');
        console.log(data);
        
        // JSON.parse es síncrono, va sin await
        const data_obj = JSON.parse(data); 
        console.log(data_obj);
        
        return data_obj; // Este return sí le llega a quien llame a getProducts()
    } catch (err) {
        console.error('Error al leer el archivo:', err);
        throw err; // Es mejor lanzar el error para manejarlo donde llames a la función
    }
}
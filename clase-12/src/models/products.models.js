import fs from 'fs';
import path from "path"
const __dirname = import.meta.dirname;
import datos from "../data/data.json" with {type: "json"}
console.log(datos)

const dataPath = path.join(__dirname, '../data/data.json');

export async function getProducts(){
    fs.readFile(dataPath, 'utf8', async (err, data) => {
        if (err) {
          console.error('Error al leer el archivo:', err);
          return;
        }
        console.log(data);
        const data_obj = await JSON.parse(data)
        console.log(data_obj)
        return data_obj;
    });
}
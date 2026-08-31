import { fileURLToPath } from 'url';
import path from 'path';
import fs from "fs"
// Obtener el directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__filename);
console.log('Ruta absoluta:', __dirname);
const filePath = path.join(__dirname, "data", "ejemplo.txt");
console.log("Ruta al archivo ejemplo.txt ", filePath);

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo:', err);
        return;
    }
    console.log('Contenido del archivo', data);
});

const args = process.argv.slice(2);
// Ignoramos los dos primeros elementos con slice
if (args[0] === 'saludar') {
    console.log(`¡Hola, ${args[1] || 'mundo'}!`);
} else if (args[0] === 'despedir') {
    console.log(`¡Adiós, ${args[1] || 'mundo'}!`);
} else {
console.log('Comando no reconocido. Usa "saludar" o "despedir".');
}
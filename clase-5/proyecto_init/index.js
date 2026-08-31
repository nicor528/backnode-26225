const fs = require('fs');
const path = require('path');

/* Obtenemos la ruta absoluta al archivo ejemplo.txt
utilizando __dirname */
console.log(__dirname)
const filePath = path.join(__dirname, 'data', 'ejemplo.txt');
console.log(filePath)
// Leemos el archivo ejemplo.txt
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
    console.error('Error al leer el archivo:', err);
    return;
    }
    console.log('Contenido del archivo', data);
});
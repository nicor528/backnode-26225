import fs from 'fs';

//const data = fs.readFileSync(data.txt, 'utf8');
//console.log(data);

fs.readFile('base.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
    console.log(data);
    const data_obj = JSON.parse(data)
    console.log(data_obj)
});

const __dirname = import.meta.dirname;

console.log(__dirname)
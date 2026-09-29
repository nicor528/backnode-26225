import express from 'express';

const app = express();

app.get('/', (req, res) => { res.send('Hola, mundo desde Express!'); });


app.listen(3000, () => { 
    console.log('Servidor en http://localhost:3000'); 
});
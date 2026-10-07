import express from "express";

const app = express();

app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`);
    next();
})

app.get('/', (req, res) => {
  res.send('Hola desde Express con middlewares!');
});

app.get("/ping", (req, res, next) => {
    res.status(200).send("pong")
    //console.log("test")
    //next()
})
//

app.use((req, res, next) => {
    //console.log("test 2")
    res.status(404).json({
        error : "404 ruta no encontrada",
        mensaje: `el recurso ${req.url} no existe`
    })
})

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
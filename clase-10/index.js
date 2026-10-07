import express from "express";

const app = express();

app.use((req, res, next) => {
    console.log(`Datos recibidos: ${req.method} ${req.url}`);
    next();
})

app.get("/JSON", (req, res) => {
    res.status(200).json({
        data: [{id: 1, email: "test@gmail"},{id: 2, email: "test2@gmail"},{id: 3, email: "test3@gmail"}],
        message: "Usuarios enviados"
    })
})

app.get("/HTML", (req, res) => {
    res.status(200).send("<h1> Bienvenido! </h1>")
})

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
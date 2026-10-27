import express from "express";
import productsRoutes from './src/rutas/products.routes.js';

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

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

app.get('/item/:id', (req, res) => {
  const itemId = req.params.id;
  res.send(`Devolviendo el ítem con ID: ${itemId}`);
});

app.use('/api', productsRoutes);

app.get('/items', (req, res) => {
  const category = req.query.category;
  const price = req.query.price;
  res.send(`Categoría: ${category}, Precio: ${price}`);
});

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
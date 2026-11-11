import "dotenv/config";
import express from "express";
import cors from "cors";
import rutasAuth from "./src/routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`Datos recibidos: ${req.method} ${req.url}`);
  next();
});

// Rutas de autenticación disponibles en /api/auth (y también en /api)
app.use("/api/auth", rutasAuth);
app.use("/api", rutasAuth);

app.use((req, res) => {
  res.status(404).json({
    error: "404 ruta no encontrada",
    mensaje: `El recurso ${req.url} no existe`,
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor Auth corriendo en http://localhost:${PORT}`);
});

# TalentoStore — Frontend E-Commerce (React + Vite + Tailwind CSS)

Proyecto Frontend diseñado para demostrar en clase la integración con un Backend en **Node.js + Express**.

## 🚀 1. Configurar la conexión con el Backend (`.env`)

En la raíz de esta carpeta (`front/`), edita el archivo [`.env`](./.env) y coloca la URL donde corre tu servidor Express:

```env
VITE_API_URL=http://localhost:3000
```

> **Nota para la clase:** Vite lee esta variable en [`src/config/env.js`](./src/config/env.js) mediante `import.meta.env.VITE_API_URL`. Además, la interfaz incluye un **Inspector de Integración (Modo Clase)** en la parte superior que muestra en tiempo real cada petición HTTP y el JSON crudo (`{ message, data }`) que responde el backend.

---

## 🔌 2. Endpoints consumidos ([`src/services/productsApi.js`](./src/services/productsApi.js))

El frontend está preparado para consumir exactamente la estructura de respuesta de tu backend:

```js
res.status(200).send({
  message: "Productos encontrados",
  data: products // [{ id, nombre, categoria, precio, stock }]
});
```

1. **Obtener todos los productos:**
   - `GET ${VITE_API_URL}/api/products`
2. **Filtrar por categoría (Query Params):**
   - `GET ${VITE_API_URL}/api/products?category=nombre_categoria`
3. **Buscar por ID (Path Params):**
   - `GET ${VITE_API_URL}/api/products/:id`

---

## 💻 3. Instalación y ejecución

```bash
npm install
npm run dev
```

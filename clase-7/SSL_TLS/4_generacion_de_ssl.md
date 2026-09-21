# 🌐 Servidor Express con SSL/TLS en Node.js  
Ejemplos tanto para **Linux/Producción (Let's Encrypt)** como para **Windows/Desarrollo (openssl)**.

---

## 📌 1. Instalación de dependencias

```bash
npm init -y
npm install express
```

En Windows podemos usar Git Bash, PowerShell o instalar openssl.
Ejecutar en la terminal:
```bash
openssl req -newkey rsa:2048 -nodes -keyout key.pem -x509 -days 365 -out cert.pem
```
```js
Esto generará dos archivos en el directorio actual:
key.pem → clave privada
cert.pem → certificado público

// server-dev.js
const express = require("express");
const https = require("https");
const fs = require("fs");

const app = express();

// Usamos los certificados generados con OpenSSL
const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("🚀 Servidor seguro en Windows con certificado local");
});

// Levantar servidor en https://localhost:3000
https.createServer(options, app).listen(3000, () => {
  console.log("✅ Servidor HTTPS en https://localhost:3000");
});
```
## 📌 Al abrir en el navegador verás un aviso de seguridad, porque el 
## certificado no está firmado por una autoridad de confianza (válido solo para pruebas locales).

## 📌 Generar certificados en Linux/Producción con Let's Encrypt
En el servidor con dominio real (midominio.com):

```bash
sudo apt update
sudo apt install certbot
sudo certbot certonly --standalone -d midominio.com -d www.midominio.com
```
# Se generan en:
```swift
/etc/letsencrypt/live/midominio.com/fullchain.pem   (certificado público)
 /etc/letsencrypt/live/midominio.com/privkey.pem     (clave privada)
```

## 📌 Código del servidor HTTPS en Producción (Linux + Let's Encrypt)
```js
// server-prod.js
const express = require("express");
const https = require("https");
const fs = require("fs");
const http = require("http");

const app = express();

// Cargar certificados de Let's Encrypt
const options = {
  key: fs.readFileSync("/etc/letsencrypt/live/midominio.com/privkey.pem"),
  cert: fs.readFileSync("/etc/letsencrypt/live/midominio.com/fullchain.pem"),
};

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("🌍 Servidor seguro con Let's Encrypt en producción");
});

// HTTPS en puerto 443
https.createServer(options, app).listen(443, () => {
  console.log("✅ HTTPS en https://midominio.com");
});

// Redirección de HTTP → HTTPS
http.createServer((req, res) => {
  res.writeHead(301, { "Location": "https://" + req.headers.host + req.url });
  res.end();
}).listen(80);
```

## 📌 Renovación automática de certificados (Linux)
Let's Encrypt caduca cada 90 días. Renovar con:
```bash
sudo certbot renew --quiet
```

## ✅ Conclusión
Windows / Desarrollo → Usar openssl para generar certificados autofirmados (key.pem, cert.pem).

Linux / Producción → Usar Let's Encrypt con Certbot para certificados válidos de confianza.

En ambos casos se usa el módulo https de Node.js con Express.

En producción siempre redirigir HTTP (puerto 80) → HTTPS (puerto 443).
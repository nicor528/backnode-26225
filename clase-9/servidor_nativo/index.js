const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req)
    console.log(req.url)
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  console.log("Hola mundo")
  res.end('Hola, mundo!');
});

server.listen(3000, () => {
  console.log(`Servidor corriendo en http://localhost:3000`);
});
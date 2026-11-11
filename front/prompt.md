actua como un desarrollador senior frontend
necesito crear un front de un e-commerce para hacer una demostración en una clase de como integrar el front y elback, entonces necesito que este front tenga los huecos listos para simplemente en la variable de entorno poner la url del backend y que este tome los datos de los productos desde ahí. 
La data desde el back viene de esta manera: 
res.status(200).send({
                message: "Productos encontrados",
                data: products
            })
products es una lista de productos que tiene: 
id, nombre, categoria, precio, stock
se puede: obtener todos los productos en /api/products , filtrar con query params: /api/products?category="" 
 y tambien buscar por id con path params: /api/products/:id

el front debe poder consumir esos endpoints. si necesitas hacerme alguna pregunta realizala, si no, comenza con el desarrollo.
Utiliza React vite con la biblioteca de estilo que quieras. 
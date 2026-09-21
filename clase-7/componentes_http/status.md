# 🌐 Códigos de Estado HTTP

Los **status codes** son respuestas estándar que un servidor HTTP envía al cliente después de recibir una solicitud.  
Se dividen en **5 categorías** principales:

---

## 📌 1xx → Informativos
- **100 Continue** → El servidor recibió los encabezados, el cliente puede continuar con el cuerpo de la petición.  
- **101 Switching Protocols** → El servidor acepta cambiar de protocolo (ej: HTTP → WebSocket).  

---

## 📌 2xx → Éxito
- **200 OK** → La solicitud fue exitosa (respuesta estándar).  
- **201 Created** → Se creó un recurso nuevo en el servidor (ej: al hacer un `POST`).  
- **202 Accepted** → La solicitud fue aceptada pero aún no procesada.  
- **204 No Content** → Solicitud exitosa, pero sin contenido en la respuesta.  

---

## 📌 3xx → Redirecciones
- **301 Moved Permanently** → El recurso fue movido de forma permanente (redirección definitiva).  
- **302 Found** → Redirección temporal.  
- **304 Not Modified** → El recurso no ha cambiado desde la última vez (se puede usar caché).  

---

## 📌 4xx → Errores del Cliente
- **400 Bad Request** → Solicitud mal formada o inválida.  
- **401 Unauthorized** → Falta autenticación o no es válida.  
- **403 Forbidden** → El cliente no tiene permisos para acceder al recurso.  
- **404 Not Found** → El recurso solicitado no existe.  
- **405 Method Not Allowed** → Método HTTP no permitido (ej: usar `DELETE` donde no corresponde).  
- **429 Too Many Requests** → El cliente envió demasiadas solicitudes en poco tiempo (rate limit).  

---

## 📌 5xx → Errores del Servidor
- **500 Internal Server Error** → Error genérico en el servidor.  
- **502 Bad Gateway** → El servidor recibió una respuesta inválida desde otro servidor.  
- **503 Service Unavailable** → El servidor no está disponible (sobrecarga o mantenimiento).  
- **504 Gateway Timeout** → El servidor no obtuvo respuesta a tiempo de otro servidor.  

---

## ✅ Resumen visual
- **1xx** → Informativos (recibido, continuando...)
- **2xx** → Éxito (todo salió bien)
- **3xx** → Redirección (el recurso cambió de lugar)
- **4xx** → Error del Cliente (tu petición tiene un problema)
- **5xx** → Error del Servidor (el servidor falló)
# Ejemplo de Renderizado de HTML desde una API

Este documento muestra cómo consumir y renderizar en el frontend un fragmento de HTML enviado desde un servidor Node.js (Express).

## 1. Backend (Express)

El servidor expone una ruta `GET` que responde directamente con una etiqueta HTML en texto plano.

```javascript
app.get('/HTML', (req, res) => {
  res.status(200).send('<h1> Bienvenido! </h1>');
});
```

---

## 2. Frontend (JavaScript Vanilla)

Para mostrar este encabezado en tu página web, debes realizar una petición HTTP, leer la respuesta como **texto** e inyectarla en el DOM.

### Código JavaScript
```javascript
// Realizar la petición al servidor Express
fetch('http://localhost:3000/HTML')
  .then(response => response.text()) // Se procesa como texto plano (HTML) y no como JSON
  .then(htmlString => {
    // Insertar el HTML directamente en el contenedor
    document.getElementById('contenedor-api').innerHTML = htmlString;
  })
  .catch(error => console.error('Error al cargar el HTML:', error));
```

### Código HTML
```html
<!-- El contenido de la API se renderizará dentro de este div -->
<div id="contenedor-api"></div>
```

---

## Explicación Breve del Proceso

1. **`res.send()` en Express:** Envía la cadena de texto `<h1> Bienvenido! </h1>` con el encabezado de respuesta configurado automáticamente como `text/html`.
2. **`response.text()` en Frontend:** A diferencia de las APIs comunes que devuelven JSON (`response.json()`), aquí usamos `.text()` porque la respuesta es código HTML crudo.
3. **`innerHTML`:** Toma esa cadena de texto HTML y le ordena al navegador que la interprete y la dibuje como un elemento real dentro de la página.


## 3. Frontend (React)

En React, debes almacenar el string HTML en un estado tras hacer la petición y utilizar la propiedad especial `dangerouslySetInnerHTML` para indicarle al framework que inserte y renderice el HTML crudo en el componente.

### Código del Componente
```jsx
import { useEffect, useState } from 'react';

function BannerBienvenida() {
  // Estado para guardar el fragmento HTML del backend
  const [contenidoHtml, setContenidoHtml] = useState('');

  useEffect(() => {
    // Petición a la API de Express
    fetch('http://localhost:3000/HTML')
      .then((res) => res.text()) // Convertimos la respuesta a texto/HTML
      .then((data) => setContenidoHtml(data))
      .catch((err) => console.error('Error al traer el HTML:', err));
  }, []);

  return (
    /* 
      dangerouslySetInnerHTML recibe un objeto con la propiedad __html.
      Equivale a usar 'innerHTML' en JavaScript Vanilla.
    */
    <div dangerouslySetInnerHTML={{ __html: contenidoHtml }} />
  );
}

export default BannerBienvenida;
```

---

### Explicación Breve en React

1. **`useState` e `useEffect`**: El Hook `useEffect` ejecuta la petición `fetch` una sola vez cuando el componente se monta en la pantalla, y `setContenidoHtml` guarda el HTML recibido en el estado.
2. **`dangerouslySetInnerHTML`**: React, por defecto, sanitiza y escapa las cadenas de texto para proteger tu aplicación de ataques informáticos (XSS). Al usar esta propiedad, le estás confirmando explícitamente a React que confías en que ese HTML proveniente de tu backend es seguro de renderizar.

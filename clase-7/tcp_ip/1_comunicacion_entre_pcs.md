# Ejemplo de comunicación entre PCs

Supongamos que **Ana (PC1)** quiere enviar un mensaje a **Luis (PC2)** por Internet:

1. Ana escribe: "Hola Luis" en un chat.
2. El mensaje pasa por las **capas de TCP/IP**:
   - **Aplicación**: El chat convierte el mensaje en datos.
   - **Transporte (TCP)**: Se divide el mensaje en "segmentos" y se asegura de que llegue completo y en orden.
   - **Red (IP)**: Cada segmento recibe la dirección IP de destino (IP de Luis).
   - **Enlace**: Se empaqueta todo en tramas para viajar por la red física.
3. El mensaje sale de la PC de Ana → va a su **router** → al **ISP (proveedor de Internet)** → viaja por diferentes nodos de Internet.
4. Finalmente llega al router de Luis y a su PC, donde el sistema operativo y la aplicación del chat **reconstruyen el mensaje**.

📦 Ejemplo de un paquete de datos:
- Origen: IP Ana → `190.15.10.5`
- Destino: IP Luis → `200.55.20.8`
- Datos: `"Hola Luis"`

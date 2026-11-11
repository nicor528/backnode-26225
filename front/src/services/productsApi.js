import { getApiBaseUrl } from "../config/env";

/**
 * ============================================================================
 * SERVICIO DE INTEGRACIÓN CON EL BACKEND (API REST)
 * ============================================================================
 * Estructura esperada desde el Backend:
 *   res.status(200).send({
 *     message: "Productos encontrados",
 *     data: products // Array de { id, nombre, categoria, precio, stock } o 1 objeto en /:id
 *   })
 *
 * Endpoints consumidos:
 *   1. GET /api/products               -> Obtener todos los productos
 *   2. GET /api/products?category=...  -> Filtrar productos por categoría (Query Param)
 *   3. GET /api/products/:id           -> Buscar un producto por su ID (Path Param)
 * ============================================================================
 */

/**
 * Normaliza un producto recibido del backend para asegurar que siempre
 * contenga las propiedades { id, nombre, categoria, precio, stock }.
 */
export function normalizeProduct(raw) {
  if (!raw || typeof raw !== "object") return null;

  return {
    id: String(raw.id ?? raw._id ?? ""),
    nombre: raw.nombre ?? raw.title ?? raw.name ?? "Producto sin nombre",
    categoria: raw.categoria ?? raw.category ?? "General",
    precio: Number(raw.precio ?? raw.price ?? 0),
    stock: Number(raw.stock ?? raw.rating?.count ?? 0),
    // Conservamos campos extra opcionales por si el alumno agrega imagen o descripción
    imagen: raw.imagen ?? raw.image ?? null,
    descripcion: raw.descripcion ?? raw.description ?? null,
  };
}

/**
 * Función auxiliar para realizar la petición HTTP y registrar metadatos
 * útiles para mostrar en vivo durante la clase (URL, status, tiempo, JSON crudo).
 */
async function requestEndpoint(fullUrl) {
  const startTime = performance.now();

  let response;
  try {
    response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
  } catch (networkError) {
    const durationMs = Math.round(performance.now() - startTime);
    const error = new Error(
      `No se pudo conectar con el servidor en ${fullUrl}. Verifica que el backend esté corriendo y tenga CORS habilitado.`
    );
    error.trace = {
      method: "GET",
      url: fullUrl,
      status: 0,
      statusText: "NETWORK_ERROR",
      ok: false,
      durationMs,
      rawBody: {
        error: "Error de red / CORS / Backend apagado",
        details: networkError.message,
      },
      timestamp: new Date().toLocaleTimeString(),
    };
    throw error;
  }

  const durationMs = Math.round(performance.now() - startTime);

  let payload = null;
  try {
    payload = await response.json();
  } catch {
    payload = { message: "La respuesta del servidor no es un JSON válido" };
  }

  const trace = {
    method: "GET",
    url: fullUrl,
    status: response.status,
    statusText: response.statusText || (response.ok ? "OK" : "Error"),
    ok: response.ok,
    durationMs,
    rawBody: payload,
    timestamp: new Date().toLocaleTimeString(),
  };

  if (!response.ok) {
    const backendMsg =
      payload?.message ||
      payload?.mensaje ||
      payload?.error ||
      `Error HTTP ${response.status}`;
    const err = new Error(backendMsg);
    err.status = response.status;
    err.trace = trace;
    throw err;
  }

  return { payload, trace };
}

/**
 * 1) OBTENER TODOS LOS PRODUCTOS (o filtrados por categoría si se envía `category`)
 *    - Sin filtro: GET ${VITE_API_URL}/api/products
 *    - Con filtro: GET ${VITE_API_URL}/api/products?category=${category}
 */
export async function getProducts(category = "", customBaseUrl = "") {
  const baseUrl = getApiBaseUrl(customBaseUrl);

  if (!baseUrl) {
    const err = new Error(
      "La variable de entorno VITE_API_URL no está configurada en el archivo .env"
    );
    err.code = "MISSING_ENV_URL";
    throw err;
  }

  // Construcción del endpoint con o sin Query Param (?category="")
  const cleanCategory = category.trim();
  const endpointPath = cleanCategory
    ? `/api/products?category=${encodeURIComponent(cleanCategory)}`
    : `/api/products`;

  const fullUrl = `${baseUrl}${endpointPath}`;
  const { payload, trace } = await requestEndpoint(fullUrl);

  // El backend devuelve: { message: "Productos encontrados", data: products }
  const rawList = Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload)
      ? payload
      : [];

  return {
    message: payload?.message || "Productos encontrados",
    data: rawList.map(normalizeProduct).filter(Boolean),
    trace,
  };
}

/**
 * 2) BUSCAR PRODUCTO POR ID (Path Param)
 *    - Endpoint: GET ${VITE_API_URL}/api/products/:id
 */
export async function getProductById(id, customBaseUrl = "") {
  const baseUrl = getApiBaseUrl(customBaseUrl);

  if (!baseUrl) {
    const err = new Error(
      "La variable de entorno VITE_API_URL no está configurada en el archivo .env"
    );
    err.code = "MISSING_ENV_URL";
    throw err;
  }

  const cleanId = String(id).trim();
  const fullUrl = `${baseUrl}/api/products/${encodeURIComponent(cleanId)}`;
  const { payload, trace } = await requestEndpoint(fullUrl);

  // El backend devuelve: { message: "Producto encontrado", data: product }
  // Soportamos tanto si `data` viene como objeto único o como array de 1 elemento
  const rawItem = Array.isArray(payload?.data)
    ? payload.data[0]
    : payload?.data ?? payload;

  return {
    message: payload?.message || "Producto encontrado",
    data: normalizeProduct(rawItem),
    trace,
  };
}

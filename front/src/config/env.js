/**
 * ============================================================================
 * CONFIGURACIÓN DE VARIABLES DE ENTORNO (Vite)
 * ============================================================================
 * En Vite, todas las variables de entorno expuestas al Frontend deben comenzar
 * con el prefijo VITE_ y se leen mediante `import.meta.env.VITE_API_URL`.
 */

const rawEnvUrl = import.meta.env.VITE_API_URL || "";

// Quitamos barra final si el usuario escribió "http://localhost:3000/"
export const ENV_API_URL = rawEnvUrl.trim().replace(/\/+$/, "");

/**
 * Helper para obtener la URL base activa.
 * Prioriza la variable de entorno `.env` (VITE_API_URL).
 */
export function getApiBaseUrl(customOverrideUrl = "") {
  const target = (customOverrideUrl || ENV_API_URL).trim().replace(/\/+$/, "");
  return target;
}

import { useState } from "react";
import {
  Terminal,
  Clock,
  Globe,
  Code2,
  ChevronUp,
  Send,
  RotateCcw,
  Layers,
} from "lucide-react";
import { ENV_API_URL } from "../config/env";

export default function ApiInspector({
  apiBaseUrl,
  customUrlOverride,
  onApplyCustomUrl,
  lastTrace,
  onClose,
}) {
  const [tempUrl, setTempUrl] = useState(customUrlOverride || apiBaseUrl || "");
  const [showRawJson, setShowRawJson] = useState(true);

  const handleOverrideSubmit = (e) => {
    e.preventDefault();
    onApplyCustomUrl(tempUrl.trim());
  };

  const handleResetToEnv = () => {
    setTempUrl(ENV_API_URL);
    onApplyCustomUrl("");
  };

  return (
    <section className="border-b border-slate-800 bg-slate-900 text-slate-100 shadow-inner">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        {/* Encabezado del Inspector */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 ring-1 ring-indigo-500/30">
              <Terminal className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-white">
                  Modo Clase: Inspector de Integración Front ↔ Back
                </h2>
                <span className="rounded bg-indigo-500/20 px-2 py-0.5 font-mono text-[10px] font-semibold text-indigo-300">
                  En vivo
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Visualiza en tiempo real qué endpoint consume React y qué JSON responde Express
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2.5 py-1 text-xs font-medium text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            <span>Ocultar panel</span>
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Grid principal del Inspector */}
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Columna Izquierda: Configuración .env y Endpoints */}
          <div className="space-y-3 lg:col-span-5">
            {/* Tarjeta .env */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  1. Variable de Entorno (.env)
                </span>
                <code className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-[11px] text-emerald-400">
                  import.meta.env.VITE_API_URL
                </code>
              </div>

              <div className="mt-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 font-mono text-xs">
                <span className="text-slate-400">VITE_API_URL=</span>
                <span className="font-semibold text-emerald-400">
                  {ENV_API_URL || "(vacío en .env)"}
                </span>
              </div>

              {/* Simulador rápido de URL en caso de querer cambiarla en vivo sin reiniciar */}
              <form onSubmit={handleOverrideSubmit} className="mt-2.5">
                <label className="block text-[11px] text-slate-400">
                  ¿Probar otra URL en vivo sin reiniciar Vite?
                </label>
                <div className="mt-1 flex gap-1.5">
                  <input
                    type="text"
                    value={tempUrl}
                    onChange={(e) => setTempUrl(e.target.value)}
                    placeholder="http://localhost:3000"
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 font-mono text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-indigo-600 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500"
                  >
                    <Send className="h-3 w-3" />
                    Conectar
                  </button>
                  {customUrlOverride && (
                    <button
                      type="button"
                      onClick={handleResetToEnv}
                      className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-700 bg-slate-800 px-2 py-1.5 text-xs text-slate-300 hover:bg-slate-700"
                      title="Volver al valor de .env"
                    >
                      <RotateCcw className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Tarjeta Endpoints mapeados */}
            <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-3.5">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Layers className="h-3.5 w-3.5 text-indigo-400" />
                <span>2. Endpoints consumidos en src/services/productsApi.js</span>
              </div>
              <ul className="mt-2.5 space-y-1.5 font-mono text-xs">
                <li className="flex items-center justify-between rounded-lg bg-slate-900/90 px-2.5 py-1.5">
                  <span>
                    <strong className="text-emerald-400">GET</strong>{" "}
                    <span className="text-slate-200">/api/products</span>
                  </span>
                  <span className=" font-sans text-[11px] text-slate-400">
                    Todos los productos
                  </span>
                </li>
                <li className="flex items-center justify-between rounded-lg bg-slate-900/90 px-2.5 py-1.5">
                  <span>
                    <strong className="text-amber-400">GET</strong>{" "}
                    <span className="text-slate-200">
                      /api/products?category=&quot;&quot;
                    </span>
                  </span>
                  <span className="font-sans text-[11px] text-slate-400">
                    Filtro Query Param
                  </span>
                </li>
                <li className="flex items-center justify-between rounded-lg bg-slate-900/90 px-2.5 py-1.5">
                  <span>
                    <strong className="text-sky-400">GET</strong>{" "}
                    <span className="text-slate-200">/api/products/:id</span>
                  </span>
                  <span className="font-sans text-[11px] text-slate-400">
                    Detalle Path Param
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Columna Derecha: Última Petición HTTP y Respuesta JSON Cruda */}
          <div className="flex flex-col rounded-xl border border-slate-800 bg-slate-950/70 p-3.5 lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-indigo-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  3. Última Petición HTTP Realizada
                </span>
              </div>

              {lastTrace && (
                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`rounded-md px-2 py-0.5 font-mono text-[11px] font-bold ${
                      lastTrace.ok
                        ? "bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-500/30"
                        : "bg-rose-500/20 text-rose-300 ring-1 ring-rose-500/30"
                    }`}
                  >
                    Status: {lastTrace.status || "ERR"} {lastTrace.statusText}
                  </span>
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-400">
                    <Clock className="h-3 w-3" />
                    {lastTrace.durationMs} ms
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowRawJson(!showRawJson)}
                    className="inline-flex items-center gap-1 rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300 hover:bg-slate-700"
                  >
                    <Code2 className="h-3 w-3" />
                    {showRawJson ? "Ocultar JSON" : "Ver JSON"}
                  </button>
                </div>
              )}
            </div>

            {lastTrace ? (
              <div className="mt-2.5 flex-1 space-y-2">
                {/* Barra de URL consultada */}
                <div className="flex items-center gap-2 overflow-x-auto rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 font-mono text-xs">
                  <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 font-bold text-indigo-300">
                    {lastTrace.method}
                  </span>
                  <span className="text-slate-200 select-all">
                    {lastTrace.url}
                  </span>
                </div>

                {/* Cuerpo de la respuesta del Backend: { message, data } */}
                {showRawJson && (
                  <div className="relative">
                    <div className="mb-1 flex items-center justify-between text-[11px] text-slate-400">
                      <span>
                        Respuesta recibida desde el controlador Express (
                        <code className="text-indigo-300">
                          res.status({lastTrace.status || 200}).send(&#123;
                          message, data &#125;)
                        </code>
                        ):
                      </span>
                      <span>{lastTrace.timestamp}</span>
                    </div>
                    <pre className="max-h-48 overflow-auto rounded-lg border border-slate-800/90 bg-slate-900/90 p-3 font-mono text-[11px] leading-relaxed text-emerald-300">
                      {JSON.stringify(lastTrace.rawBody, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center py-8 text-center text-xs text-slate-500">
                Aún no se han registrado peticiones HTTP al backend.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

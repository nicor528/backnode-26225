import {
  ShoppingBag,
  ShoppingCart,
  Terminal,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Server,
} from "lucide-react";

export default function Navbar({
  apiBaseUrl,
  connectionState, // 'connected' | 'error' | 'unconfigured' | 'loading'
  cartCount,
  onOpenCart,
  showInspector,
  onToggleInspector,
  onReloadAll,
  isLoading,
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Marca del E-Commerce */}
        <div className="flex items-center gap-3">
          <button
            onClick={onReloadAll}
            className="group flex items-center gap-3 text-left focus:outline-none"
            title="Volver al catálogo completo (GET /api/products)"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm shadow-indigo-200 transition-transform group-hover:scale-105">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-tight text-slate-900">
                  Talento<span className="text-indigo-600">Store</span>
                </span>
                <span className="hidden rounded-full bg-indigo-50 px-2 py-0.5 text-[11px] font-semibold text-indigo-700 sm:inline-block">
                  React + Node API
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Demostración de integración Frontend ↔ Backend
              </p>
            </div>
          </button>
        </div>

        {/* Estado de conexión a VITE_API_URL y acciones */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* Pill de estado del Backend */}
          <div
            onClick={onToggleInspector}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onToggleInspector()}
            className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              connectionState === "connected"
                ? "border-emerald-200 bg-emerald-50/80 text-emerald-800 hover:bg-emerald-100/80"
                : connectionState === "unconfigured"
                  ? "border-amber-200 bg-amber-50 text-amber-800 hover:bg-amber-100"
                  : connectionState === "error"
                    ? "border-rose-200 bg-rose-50 text-rose-800 hover:bg-rose-100"
                    : "border-slate-200 bg-slate-100 text-slate-700"
            }`}
            title="Haz clic para abrir/cerrar el Inspector de API"
          >
            {connectionState === "connected" ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
            ) : connectionState === "unconfigured" ? (
              <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
            ) : connectionState === "error" ? (
              <AlertCircle className="h-3.5 w-3.5 text-rose-600 shrink-0" />
            ) : (
              <Server className="h-3.5 w-3.5 text-slate-500 animate-pulse shrink-0" />
            )}

            <span className="hidden md:inline font-semibold">VITE_API_URL:</span>
            <code className="font-mono text-[11px]">
              {apiBaseUrl || "No configurada (.env)"}
            </code>
          </div>

          {/* Botón Recargar GET /api/products */}
          <button
            type="button"
            onClick={onReloadAll}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
            title="Ejecutar GET /api/products"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 text-slate-600 ${
                isLoading ? "animate-spin text-indigo-600" : ""
              }`}
            />
            <span className="hidden sm:inline">GET /api/products</span>
          </button>

          {/* Toggle Inspector Modo Clase */}
          <button
            type="button"
            onClick={onToggleInspector}
            className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition ${
              showInspector
                ? "border-slate-900 bg-slate-900 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Terminal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Inspector API</span>
          </button>

          {/* Botón Carrito */}
          <button
            type="button"
            onClick={onOpenCart}
            className="relative inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.99]"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Carrito</span>
            <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1.5 text-[11px] font-bold text-indigo-700">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

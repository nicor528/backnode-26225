import {
  X,
  ShoppingCart,
  Tag,
  Hash,
  Layers,
  DollarSign,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Code2,
} from "lucide-react";
import { getCategoryTheme, formatPrice } from "../utils/categoryVisuals";

export default function ProductDetailModal({
  isOpen,
  isLoading,
  requestedId,
  product,
  backendMessage,
  error,
  trace,
  cartQuantity = 0,
  onClose,
  onAddToCart,
  onFilterByCategory,
}) {
  if (!isOpen) return null;

  const theme = getCategoryTheme(product?.categoria);
  const Icon = theme.Icon;
  const availableStock = product ? Math.max(0, product.stock - cartQuantity) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="relative flex max-h-[90vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        {/* Cabecera mostrando el endpoint Path Param consumido */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-900 px-5 py-3.5 text-white">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="rounded bg-sky-500/20 px-2 py-0.5 font-mono text-xs font-bold text-sky-300">
              GET
            </span>
            <code className="truncate font-mono text-xs text-slate-200">
              /api/products/
              <span className="font-bold text-sky-400">{requestedId}</span>
            </code>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Contenido del Modal */}
        <div className="overflow-y-auto p-5 sm:p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Loader2 className="h-9 w-9 animate-spin text-sky-600" />
              <p className="mt-3 text-sm font-semibold text-slate-700">
                Consultando producto por ID en el backend...
              </p>
              <code className="mt-1 font-mono text-xs text-slate-400">
                GET /api/products/{requestedId}
              </code>
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50/70 p-5 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                <AlertCircle className="h-6 w-6" />
              </div>
              <h3 className="mt-3 text-base font-bold text-rose-900">
                {error}
              </h3>
              <p className="mt-1 text-xs text-rose-700">
                El endpoint{" "}
                <code className="font-mono font-semibold">
                  /api/products/{requestedId}
                </code>{" "}
                respondió con estado{" "}
                <span className="font-bold">{trace?.status || 404}</span>.
              </p>

              {trace?.rawBody && (
                <div className="mt-4 text-left">
                  <span className="text-[11px] font-semibold uppercase text-rose-800">
                    Respuesta JSON del Servidor:
                  </span>
                  <pre className="mt-1 overflow-x-auto rounded-xl bg-slate-900 p-3 font-mono text-xs text-rose-300">
                    {JSON.stringify(trace.rawBody, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : product ? (
            <div className="space-y-5">
              {/* Mensaje de respuesta del backend */}
              <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50/70 px-3.5 py-2 text-xs text-emerald-800">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>message:</strong> &quot;{backendMessage}&quot;
                  </span>
                </div>
                {trace?.status && (
                  <span className="rounded bg-emerald-200/70 px-1.5 py-0.5 font-mono text-[11px] font-bold text-emerald-900">
                    HTTP {trace.status}
                  </span>
                )}
              </div>

              {/* Tarjeta principal del producto */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div
                  className={`flex h-32 w-full shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.gradient} sm:h-36 sm:w-36`}
                >
                  {product.imagen ? (
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      className="h-28 w-28 object-contain"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/90 shadow-sm">
                      <Icon className={`h-9 w-9 ${theme.iconColor}`} />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onFilterByCategory(product.categoria);
                      }}
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${theme.badgeBg}`}
                    >
                      <Tag className="h-3 w-3" />
                      {product.categoria}
                    </button>
                    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 font-mono text-xs text-slate-600">
                      <Hash className="h-3 w-3" />
                      id: {product.id}
                    </span>
                  </div>

                  <h2 className="text-xl font-extrabold text-slate-900">
                    {product.nombre}
                  </h2>

                  {product.descripcion && (
                    <p className="text-xs leading-relaxed text-slate-600">
                      {product.descripcion}
                    </p>
                  )}

                  <div className="pt-1 text-2xl font-extrabold text-indigo-600">
                    {formatPrice(product.precio)}
                  </div>
                </div>
              </div>

              {/* Grilla con las 5 propiedades del esquema del producto */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
                <div className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Code2 className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Propiedades recibidas en `data`</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  <div className="rounded-lg border border-slate-200/80 bg-white p-2.5">
                    <span className="block font-mono text-[10px] uppercase text-slate-400">
                      id
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-xs font-bold text-slate-800">
                      {product.id}
                    </span>
                  </div>
                  <div className="rounded-lg border border-slate-200/80 bg-white p-2.5 col-span-2 sm:col-span-2">
                    <span className="block font-mono text-[10px] uppercase text-slate-400">
                      nombre
                    </span>
                    <span className="mt-0.5 block truncate text-xs font-bold text-slate-800">
                      {product.nombre}
                    </span>
                  </div>
                  <div className="rounded-lg border border-slate-200/80 bg-white p-2.5">
                    <span className="block font-mono text-[10px] uppercase text-slate-400">
                      categoria
                    </span>
                    <span className="mt-0.5 block text-xs font-bold capitalize text-slate-800">
                      {product.categoria}
                    </span>
                  </div>
                  <div className="rounded-lg border border-slate-200/80 bg-white p-2.5">
                    <span className="block font-mono text-[10px] uppercase text-slate-400">
                      precio
                    </span>
                    <span className="mt-0.5 flex items-center gap-0.5 text-xs font-bold text-emerald-700">
                      <DollarSign className="h-3 w-3" />
                      {product.precio}
                    </span>
                  </div>
                  <div className="rounded-lg border border-slate-200/80 bg-white p-2.5">
                    <span className="block font-mono text-[10px] uppercase text-slate-400">
                      stock
                    </span>
                    <span className="mt-0.5 flex items-center gap-1 text-xs font-bold text-slate-800">
                      <Layers className="h-3 w-3 text-indigo-500" />
                      {product.stock} unidades
                    </span>
                  </div>
                </div>
              </div>

              {/* Botón de acción para agregar al carrito */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  disabled={product.stock <= 0 || availableStock <= 0}
                  onClick={() => onAddToCart(product)}
                  className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span>
                    {product.stock <= 0
                      ? "Sin Stock"
                      : availableStock <= 0
                        ? "Stock máximo en carrito"
                        : "Agregar al carrito"}
                  </span>
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

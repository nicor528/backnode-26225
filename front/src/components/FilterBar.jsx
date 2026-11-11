import { useState } from "react";
import {
  Filter,
  Search,
  Tag,
  Hash,
  X,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

export default function FilterBar({
  categories,
  activeCategory,
  onSelectCategory,
  onSearchById,
  sampleIds = [],
  isLoading,
}) {
  const [customCategoryInput, setCustomCategoryInput] = useState("");
  const [productIdInput, setProductIdInput] = useState("");

  const handleCategorySubmit = (e) => {
    e.preventDefault();
    onSelectCategory(customCategoryInput.trim());
  };

  const handleClearCategory = () => {
    setCustomCategoryInput("");
    onSelectCategory("");
  };

  const handleIdSubmit = (e) => {
    e.preventDefault();
    if (!productIdInput.trim()) return;
    onSearchById(productIdInput.trim());
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-5">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
        {/* ================================================================
            SECCIÓN 1: FILTRAR CON QUERY PARAMS (/api/products?category="")
           ================================================================ */}
        <div className="space-y-3 lg:col-span-7 lg:border-r lg:border-slate-100 lg:pr-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Filter className="h-4 w-4" />
              </span>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Filtrar por Categoría (Query Params)
                </h3>
                <p className="font-mono text-[11px] text-slate-500">
                  GET /api/products
                  <span className="font-semibold text-indigo-600">
                    {activeCategory
                      ? `?category=${encodeURIComponent(activeCategory)}`
                      : ""}
                  </span>
                </p>
              </div>
            </div>

            {activeCategory && (
              <button
                type="button"
                onClick={handleClearCategory}
                className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                <RotateCcw className="h-3 w-3" />
                Quitar filtro
              </button>
            )}
          </div>

          {/* Botones rápidos de categorías detectadas en la base de datos */}
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setCustomCategoryInput("");
                onSelectCategory("");
              }}
              disabled={isLoading}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                activeCategory === ""
                  ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                  : "border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>Todos</span>
              <code
                className={`rounded px-1 py-0.5 text-[10px] ${
                  activeCategory === ""
                    ? "bg-indigo-700 text-indigo-100"
                    : "bg-slate-200/70 text-slate-600"
                }`}
              >
                /api/products
              </code>
            </button>

            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    setCustomCategoryInput(cat);
                    onSelectCategory(cat);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold capitalize transition ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-200"
                      : "border border-slate-200 bg-white text-slate-700 hover:border-indigo-200 hover:bg-indigo-50/50"
                  }`}
                >
                  <Tag className="h-3 w-3 opacity-75" />
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {/* Input manual para probar cualquier valor de ?category= en clase */}
          <form onSubmit={handleCategorySubmit} className="flex gap-2 pt-1">
            <div className="relative flex-1">
              <input
                type="text"
                value={customCategoryInput}
                onChange={(e) => setCustomCategoryInput(e.target.value)}
                placeholder='Escribe una categoría para consultar ?category="..."'
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-xs text-slate-800 placeholder-slate-400 transition focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/15"
              />
              {customCategoryInput && (
                <button
                  type="button"
                  onClick={() => setCustomCategoryInput("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
            >
              <span>Filtrar Query</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

        {/* ================================================================
            SECCIÓN 2: BUSCAR POR ID CON PATH PARAMS (/api/products/:id)
           ================================================================ */}
        <div className="space-y-3 lg:col-span-5">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-50 text-sky-600">
              <Hash className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Buscar Producto por ID (Path Params)
              </h3>
              <p className="font-mono text-[11px] text-slate-500">
                GET /api/products/
                <span className="font-semibold text-sky-600">
                  {productIdInput.trim() || ":id"}
                </span>
              </p>
            </div>
          </div>

          <form onSubmit={handleIdSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={productIdInput}
                onChange={(e) => setProductIdInput(e.target.value)}
                placeholder="Ingresa el ID del producto (ej: 1 o ID de Firebase)..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2 pl-8 pr-7 font-mono text-xs text-slate-800 placeholder-slate-400 transition focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/15"
              />
              {productIdInput && (
                <button
                  type="button"
                  onClick={() => setProductIdInput("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading || !productIdInput.trim()}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-sky-600 px-3.5 py-2 text-xs font-semibold text-white shadow-sm shadow-sky-100 transition hover:bg-sky-700 disabled:opacity-50"
            >
              <span>Buscar ID</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Chips rápidos con IDs reales para facilitar la demostración en vivo */}
          {sampleIds.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
              <span className="text-[11px] font-medium text-slate-400">
                IDs rápidos para probar:
              </span>
              {sampleIds.slice(0, 4).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setProductIdInput(item.id);
                    onSearchById(item.id);
                  }}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] text-slate-600 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                  title={`Consultar GET /api/products/${item.id} (${item.nombre})`}
                >
                  <span className="text-slate-400">#</span>
                  <span className="max-w-[90px] truncate">{item.id}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

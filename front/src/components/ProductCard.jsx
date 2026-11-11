import {
  ShoppingCart,
  Eye,
  PackageCheck,
  AlertTriangle,
  PackageX,
  Tag,
} from "lucide-react";
import { getCategoryTheme, formatPrice } from "../utils/categoryVisuals";

export default function ProductCard({
  product,
  cartQuantity = 0,
  onAddToCart,
  onInspectById,
  onFilterByCategory,
}) {
  const { id, nombre, categoria, precio, stock, imagen } = product;
  const { Icon, gradient, iconColor, badgeBg } = getCategoryTheme(categoria);

  const availableStock = Math.max(0, stock - cartQuantity);
  const isOutOfStock = stock <= 0;
  const isLowStock = stock > 0 && stock <= 5;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md">
      {/* Cabecera visual del producto */}
      <div
        onClick={() => onInspectById(id)}
        className={`relative flex h-44 cursor-pointer items-center justify-center bg-gradient-to-br ${gradient} p-6 transition-opacity group-hover:opacity-95`}
      >
        {imagen ? (
          <img
            src={imagen}
            alt={nombre}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white/85 shadow-sm ring-1 ring-black/5 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Icon className={`h-10 w-10 ${iconColor}`} />
          </div>
        )}

        {/* Badge Superior Izquierdo: Categoría (clicable para filtrar) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onFilterByCategory(categoria);
          }}
          title={`Filtrar por ?category=${categoria}`}
          className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold capitalize shadow-sm transition hover:scale-105 ${badgeBg}`}
        >
          <Tag className="h-3 w-3" />
          <span>{categoria}</span>
        </button>

        {/* Badge Superior Derecho: ID del documento/producto */}
        <span
          className="absolute right-3 top-3 rounded-lg border border-slate-200/80 bg-white/90 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-600 shadow-sm backdrop-blur-sm"
          title={`ID del producto: ${id}`}
        >
          ID: {id.length > 8 ? `${id.slice(0, 8)}…` : id}
        </span>
      </div>

      {/* Cuerpo con los datos { nombre, precio, stock } */}
      <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
        <div>
          <h3
            onClick={() => onInspectById(id)}
            className="line-clamp-2 cursor-pointer text-base font-bold text-slate-900 transition-colors group-hover:text-indigo-600"
            title={nombre}
          >
            {nombre}
          </h3>

          {/* Indicador de Stock */}
          <div className="mt-2.5 flex items-center justify-between text-xs">
            {isOutOfStock ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-0.5 font-medium text-rose-700">
                <PackageX className="h-3.5 w-3.5" />
                Sin stock (0)
              </span>
            ) : isLowStock ? (
              <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 font-medium text-amber-700">
                <AlertTriangle className="h-3.5 w-3.5" />
                ¡Últimas {stock} u. en stock!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 font-medium text-emerald-700">
                <PackageCheck className="h-3.5 w-3.5" />
                Stock disponible: {stock} u.
              </span>
            )}

            {cartQuantity > 0 && (
              <span className="font-mono text-[11px] font-semibold text-indigo-600">
                En carrito: {cartQuantity}
              </span>
            )}
          </div>
        </div>

        {/* Precio y Acciones */}
        <div className="mt-4 border-t border-slate-100 pt-3.5">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-medium text-slate-400">Precio</span>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              {formatPrice(precio)}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {/* Botón que dispara GET /api/products/:id */}
            <button
              type="button"
              onClick={() => onInspectById(id)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
              title={`Consultar endpoint GET /api/products/${id}`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Ver /:id</span>
            </button>

            {/* Botón Agregar al Carrito */}
            <button
              type="button"
              disabled={isOutOfStock || availableStock <= 0}
              onClick={() => onAddToCart(product)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 px-3 py-2 text-xs font-semibold text-white shadow-sm shadow-indigo-100 transition hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
            >
              <ShoppingCart className="h-3.5 w-3.5" />
              <span>
                {isOutOfStock
                  ? "Agotado"
                  : availableStock <= 0
                    ? "Máx. stock"
                    : "Agregar"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

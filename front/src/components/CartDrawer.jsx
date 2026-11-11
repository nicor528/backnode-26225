import { useState } from "react";
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { formatPrice, getCategoryTheme } from "../utils/categoryVisuals";

export default function CartDrawer({
  isOpen,
  cartItems,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) {
  const [orderCompleted, setOrderCompleted] = useState(false);

  if (!isOpen) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.precio * item.quantity,
    0
  );

  const handleCheckout = () => {
    setOrderCompleted(true);
    setTimeout(() => {
      onClearCart();
      setOrderCompleted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm">
      <div className="flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
        {/* Cabecera */}
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <ShoppingCart className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Tu Carrito de Compras
              </h2>
              <p className="text-xs text-slate-500">
                {totalItems} {totalItems === 1 ? "producto" : "productos"} seleccionados
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Lista de items */}
        <div className="flex-1 overflow-y-auto p-5">
          {orderCompleted ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-9 w-9" />
              </div>
              <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                ¡Compra simulada con éxito!
              </h3>
              <p className="mt-1 max-w-xs text-xs text-slate-500">
                El pedido fue procesado correctamente utilizando el stock validado del backend.
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <h3 className="mt-4 text-sm font-bold text-slate-800">
                Tu carrito está vacío
              </h3>
              <p className="mt-1 max-w-xs text-xs text-slate-500">
                Agrega productos desde el catálogo para probar la validación de stock y el cálculo de subtotales.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {cartItems.map((item) => {
                const { Icon, iconColor, gradient } = getCategoryTheme(
                  item.categoria
                );
                const maxReached = item.quantity >= item.stock;

                return (
                  <li
                    key={item.id}
                    className="flex items-center gap-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-3"
                  >
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}
                    >
                      <Icon className={`h-6 w-6 ${iconColor}`} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="truncate text-xs font-bold text-slate-900">
                          {item.nombre}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-slate-400 hover:text-rose-600"
                          title="Quitar del carrito"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] capitalize text-slate-500">
                        {item.categoria} • Stock máx: {item.stock}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="inline-flex items-center rounded-lg border border-slate-200 bg-white">
                          <button
                            type="button"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 text-slate-600 hover:bg-slate-100"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-2.5 font-mono text-xs font-bold text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            disabled={maxReached}
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 text-slate-600 hover:bg-slate-100 disabled:opacity-30"
                            title={
                              maxReached
                                ? "Alcanzaste el límite de stock disponible"
                                : "Sumar unidad"
                            }
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <span className="text-sm font-extrabold text-slate-900">
                          {formatPrice(item.precio * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Pie del Carrito */}
        {cartItems.length > 0 && !orderCompleted && (
          <div className="border-t border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-slate-600">Total a pagar</span>
              <span className="text-xl font-extrabold text-slate-900">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={onClearCart}
                className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Vaciar
              </button>
              <button
                type="button"
                onClick={handleCheckout}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
              >
                <span>Finalizar Compra</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

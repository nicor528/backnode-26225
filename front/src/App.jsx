import { useState, useEffect, useCallback } from "react";
import Navbar from "./components/Navbar";
import ApiInspector from "./components/ApiInspector";
import FilterBar from "./components/FilterBar";
import ProductCard from "./components/ProductCard";
import ProductDetailModal from "./components/ProductDetailModal";
import CartDrawer from "./components/CartDrawer";
import { getProducts, getProductById } from "./services/productsApi";
import { getApiBaseUrl } from "./config/env";
import {
  CheckCircle2,
  AlertTriangle,
  ServerCrash,
  Loader2,
  PackageSearch,
  RotateCcw,
  Terminal,
} from "lucide-react";

export default function App() {
  // Permite probar otra URL en vivo desde el Inspector sin reiniciar Vite,
  // aunque por defecto toma import.meta.env.VITE_API_URL desde .env
  const [customUrlOverride, setCustomUrlOverride] = useState("");
  const activeBaseUrl = getApiBaseUrl(customUrlOverride);

  // Estado principal de productos y categorías
  const [products, setProducts] = useState([]);
  const [knownCategories, setKnownCategories] = useState([]);
  const [sampleIds, setSampleIds] = useState([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [backendMessage, setBackendMessage] = useState("");

  // Estados de carga, error y trazas para el Inspector en vivo
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastTrace, setLastTrace] = useState(null);
  const [showInspector, setShowInspector] = useState(true);

  // Estado del Modal de Detalle por ID (GET /api/products/:id)
  const [detailModal, setDetailModal] = useState({
    isOpen: false,
    isLoading: false,
    requestedId: "",
    product: null,
    backendMessage: "",
    error: null,
    trace: null,
  });

  // Estado del Carrito de Compras
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  /**
   * Consume GET /api/products o GET /api/products?category=""
   */
  const loadProducts = useCallback(
    async (categoryToFetch = "", baseUrlOverride = customUrlOverride) => {
      const targetBaseUrl = getApiBaseUrl(baseUrlOverride);
      setActiveCategory(categoryToFetch);

      if (!targetBaseUrl) {
        setProducts([]);
        setBackendMessage("");
        setError({
          type: "MISSING_ENV",
          message:
            "La variable VITE_API_URL está vacía. Configúrala en el archivo .env para conectar con el backend.",
        });
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const result = await getProducts(categoryToFetch, baseUrlOverride);
        setProducts(result.data);
        setBackendMessage(result.message);
        setLastTrace(result.trace);

        // Si trajimos todos los productos (sin filtro), actualizamos la lista
        // de categorías disponibles y de IDs de ejemplo para los botones rápidos
        if (!categoryToFetch && result.data.length > 0) {
          const uniqueCats = Array.from(
            new Set(
              result.data
                .map((p) => p.categoria?.trim())
                .filter(Boolean)
            )
          );
          setKnownCategories(uniqueCats);
          setSampleIds(
            result.data.map((p) => ({ id: p.id, nombre: p.nombre }))
          );
        } else if (result.data.length > 0 && knownCategories.length === 0) {
          const uniqueCats = Array.from(
            new Set(
              result.data
                .map((p) => p.categoria?.trim())
                .filter(Boolean)
            )
          );
          setKnownCategories(uniqueCats);
        }
      } catch (err) {
        setProducts([]);
        setBackendMessage("");
        if (err.trace) {
          setLastTrace(err.trace);
        }
        setError({
          type: err.status === 404 ? "NOT_FOUND" : "NETWORK_OR_SERVER",
          status: err.status,
          message: err.message,
        });
      } finally {
        setIsLoading(false);
      }
    },
    [customUrlOverride, knownCategories.length]
  );

  // Cargar todos los productos al iniciar o al cambiar la URL del backend
  useEffect(() => {
    loadProducts("");
  }, [loadProducts]);

  /**
   * Consume GET /api/products/:id (Path Param)
   */
  const handleInspectById = async (id) => {
    const cleanId = String(id).trim();
    if (!cleanId) return;

    setDetailModal({
      isOpen: true,
      isLoading: true,
      requestedId: cleanId,
      product: null,
      backendMessage: "",
      error: null,
      trace: null,
    });

    try {
      const result = await getProductById(cleanId, customUrlOverride);
      setLastTrace(result.trace);
      setDetailModal({
        isOpen: true,
        isLoading: false,
        requestedId: cleanId,
        product: result.data,
        backendMessage: result.message,
        error: null,
        trace: result.trace,
      });
    } catch (err) {
      if (err.trace) {
        setLastTrace(err.trace);
      }
      setDetailModal({
        isOpen: true,
        isLoading: false,
        requestedId: cleanId,
        product: null,
        backendMessage: "",
        error: err.message || "Producto no encontrado",
        trace: err.trace || null,
      });
    }
  };

  /**
   * Funciones del Carrito de Compras
   */
  const handleAddToCart = (product) => {
    if (!product || product.stock <= 0) return;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateCartQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.min(item.stock, newQty) }
          : item
      )
    );
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const getCartQuantity = (productId) => {
    return cartItems.find((item) => item.id === productId)?.quantity || 0;
  };

  const totalCartCount = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // Estado visual de la conexión con el backend
  const connectionState = !activeBaseUrl
    ? "unconfigured"
    : isLoading
      ? "loading"
      : error?.type === "NETWORK_OR_SERVER" && !error?.status
        ? "error"
        : "connected";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {/* Barra de Navegación */}
      <Navbar
        apiBaseUrl={activeBaseUrl}
        connectionState={connectionState}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        showInspector={showInspector}
        onToggleInspector={() => setShowInspector((v) => !v)}
        onReloadAll={() => loadProducts("")}
        isLoading={isLoading}
      />

      {/* Panel Inspector de API para la demostración en clase */}
      {showInspector && (
        <ApiInspector
          apiBaseUrl={activeBaseUrl}
          customUrlOverride={customUrlOverride}
          onApplyCustomUrl={(newUrl) => {
            setCustomUrlOverride(newUrl);
            loadProducts("", newUrl);
          }}
          lastTrace={lastTrace}
          onClose={() => setShowInspector(false)}
        />
      )}

      {/* Contenido Principal */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* Barra de Filtros: Query Params (?category="") y Path Params (/:id) */}
        <FilterBar
          categories={knownCategories}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => loadProducts(cat)}
          onSearchById={handleInspectById}
          sampleIds={sampleIds}
          isLoading={isLoading}
        />

        {/* Banner con el mensaje devuelto por el Backend ({ message, data }) */}
        {!isLoading && !error && backendMessage && (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-emerald-200/80 bg-emerald-50/70 px-4 py-2.5 text-xs text-emerald-900">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>
                Respuesta del Backend:{" "}
                <strong className="font-semibold">
                  &quot;{backendMessage}&quot;
                </strong>
              </span>
              {activeCategory && (
                <span className="rounded-md bg-emerald-200/70 px-2 py-0.5 font-mono text-[11px] font-semibold text-emerald-900">
                  ?category={activeCategory}
                </span>
              )}
            </div>
            <span className="font-mono text-xs font-bold text-emerald-800">
              data.length: {products.length}{" "}
              {products.length === 1 ? "producto" : "productos"}
            </span>
          </div>
        )}

        {/* Estado 1: Cargando */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20 text-center shadow-sm">
            <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
            <h3 className="mt-4 text-base font-bold text-slate-800">
              Obteniendo productos desde el Backend...
            </h3>
            <code className="mt-1.5 rounded-lg bg-slate-100 px-3 py-1 font-mono text-xs text-indigo-600">
              GET {activeBaseUrl}/api/products
              {activeCategory
                ? `?category=${encodeURIComponent(activeCategory)}`
                : ""}
            </code>
          </div>
        ) : error ? (
          /* Estado 2: Error (Sin configurar .env, 404 no encontrados, o Backend apagado) */
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-12">
            {error.type === "NOT_FOUND" ? (
              <>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <PackageSearch className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                  {error.message}
                </h3>
                <p className="mx-auto mt-1 max-w-md text-xs text-slate-500">
                  El backend respondió con estado <strong>HTTP 404</strong> al
                  consultar{" "}
                  <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-slate-700">
                    /api/products
                    {activeCategory ? `?category=${activeCategory}` : ""}
                  </code>
                  .
                </p>
                {activeCategory && (
                  <button
                    type="button"
                    onClick={() => loadProducts("")}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Volver a todos los productos (/api/products)
                  </button>
                )}
              </>
            ) : error.type === "MISSING_ENV" ? (
              <>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-600">
                  <AlertTriangle className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                  Falta configurar VITE_API_URL en el archivo .env
                </h3>
                <p className="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-slate-600">
                  Abre el archivo <code className="font-mono font-bold">.env</code>{" "}
                  en la raíz del proyecto <code className="font-mono">front/</code>{" "}
                  y coloca la URL de tu backend Node/Express:
                </p>
                <div className="mx-auto mt-4 max-w-md rounded-xl bg-slate-900 p-4 text-left font-mono text-xs text-emerald-400">
                  VITE_API_URL=http://localhost:3000
                </div>
              </>
            ) : (
              <>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                  <ServerCrash className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-lg font-extrabold text-slate-900">
                  No se pudo conectar con el Backend
                </h3>
                <p className="mx-auto mt-1.5 max-w-lg text-xs leading-relaxed text-slate-600">
                  {error.message}
                </p>
                <div className="mx-auto mt-5 max-w-lg rounded-xl border border-slate-200 bg-slate-50 p-4 text-left text-xs text-slate-700">
                  <p className="font-bold text-slate-900">
                    Checklist rápido para la clase:
                  </p>
                  <ol className="mt-2 list-decimal space-y-1 pl-4 text-slate-600">
                    <li>
                      Verifica que tu servidor backend esté corriendo (ej:{" "}
                      <code className="rounded bg-slate-200/70 px-1 font-mono">
                        npm run dev
                      </code>{" "}
                      en el puerto 3000).
                    </li>
                    <li>
                      Asegúrate de tener{" "}
                      <code className="rounded bg-slate-200/70 px-1 font-mono">
                        app.use(cors())
                      </code>{" "}
                      habilitado en tu <code className="font-mono">index.js</code>.
                    </li>
                    <li>
                      Revisa que <code className="font-mono">VITE_API_URL</code> en{" "}
                      <code className="font-mono">.env</code> apunte a{" "}
                      <code className="font-mono">{activeBaseUrl}</code>.
                    </li>
                  </ol>
                </div>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => loadProducts(activeCategory)}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reintentar conexión
                  </button>
                  {!showInspector && (
                    <button
                      type="button"
                      onClick={() => setShowInspector(true)}
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                    >
                      <Terminal className="h-4 w-4" />
                      Abrir Inspector API
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          /* Estado 3: Grilla de Productos */
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                cartQuantity={getCartQuantity(product.id)}
                onAddToCart={handleAddToCart}
                onInspectById={handleInspectById}
                onFilterByCategory={(cat) => loadProducts(cat)}
              />
            ))}
          </section>
        )}
      </main>

      {/* Pie de página educativo */}
      <footer className="mt-12 border-t border-slate-200 bg-white py-5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 text-xs text-slate-500 sm:px-6 lg:px-8">
          <span>
            <strong>TalentoStore</strong> • Demo Práctica de Integración Frontend (React + Vite) & Backend (Node + Express)
          </span>
          <span className="font-mono">
            Endpoints: /api/products | /api/products?category=&quot;&quot; | /api/products/:id
          </span>
        </div>
      </footer>

      {/* Modal de Detalle por ID (GET /api/products/:id) */}
      <ProductDetailModal
        isOpen={detailModal.isOpen}
        isLoading={detailModal.isLoading}
        requestedId={detailModal.requestedId}
        product={detailModal.product}
        backendMessage={detailModal.backendMessage}
        error={detailModal.error}
        trace={detailModal.trace}
        cartQuantity={
          detailModal.product ? getCartQuantity(detailModal.product.id) : 0
        }
        onClose={() =>
          setDetailModal((prev) => ({ ...prev, isOpen: false }))
        }
        onAddToCart={handleAddToCart}
        onFilterByCategory={(cat) => loadProducts(cat)}
      />

      {/* Drawer del Carrito */}
      <CartDrawer
        isOpen={isCartOpen}
        cartItems={cartItems}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </div>
  );
}

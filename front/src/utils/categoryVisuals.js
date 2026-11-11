import {
  Laptop,
  Shirt,
  Home,
  Watch,
  Gamepad2,
  Headphones,
  ShoppingBag,
  Sparkles,
  Package,
  Dumbbell,
  BookOpen,
} from "lucide-react";

/**
 * Devuelve un tema visual e ícono según el nombre de la categoría
 * para que las tarjetas luzcan atractivas incluso cuando el backend
 * solo envía { id, nombre, categoria, precio, stock }.
 */
export function getCategoryTheme(categoria = "") {
  const norm = String(categoria).toLowerCase().trim();

  if (
    norm.includes("electro") ||
    norm.includes("tecno") ||
    norm.includes("compu") ||
    norm.includes("notebook") ||
    norm.includes("celular")
  ) {
    return {
      Icon: Laptop,
      gradient: "from-indigo-500/15 via-blue-500/10 to-cyan-500/15",
      iconColor: "text-indigo-600",
      badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200",
    };
  }

  if (
    norm.includes("audio") ||
    norm.includes("auricular") ||
    norm.includes("musica") ||
    norm.includes("sonido")
  ) {
    return {
      Icon: Headphones,
      gradient: "from-violet-500/15 via-purple-500/10 to-fuchsia-500/15",
      iconColor: "text-violet-600",
      badgeBg: "bg-violet-50 text-violet-700 border-violet-200",
    };
  }

  if (
    norm.includes("gamer") ||
    norm.includes("juego") ||
    norm.includes("consola") ||
    norm.includes("gaming")
  ) {
    return {
      Icon: Gamepad2,
      gradient: "from-purple-500/15 via-indigo-500/10 to-pink-500/15",
      iconColor: "text-purple-600",
      badgeBg: "bg-purple-50 text-purple-700 border-purple-200",
    };
  }

  if (
    norm.includes("ropa") ||
    norm.includes("indumentaria") ||
    norm.includes("clothing") ||
    norm.includes("remera") ||
    norm.includes("campera") ||
    norm.includes("calzado") ||
    norm.includes("zapatilla")
  ) {
    return {
      Icon: Shirt,
      gradient: "from-rose-500/15 via-pink-500/10 to-orange-500/15",
      iconColor: "text-rose-600",
      badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
    };
  }

  if (
    norm.includes("hogar") ||
    norm.includes("mueble") ||
    norm.includes("cocina") ||
    norm.includes("deco") ||
    norm.includes("electrodomestico")
  ) {
    return {
      Icon: Home,
      gradient: "from-emerald-500/15 via-teal-500/10 to-cyan-500/15",
      iconColor: "text-emerald-600",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
  }

  if (
    norm.includes("joya") ||
    norm.includes("jewel") ||
    norm.includes("reloj") ||
    norm.includes("accesorio")
  ) {
    return {
      Icon: Watch,
      gradient: "from-amber-500/15 via-yellow-500/10 to-orange-500/15",
      iconColor: "text-amber-600",
      badgeBg: "bg-amber-50 text-amber-700 border-amber-200",
    };
  }

  if (norm.includes("deporte") || norm.includes("fitness")) {
    return {
      Icon: Dumbbell,
      gradient: "from-lime-500/15 via-emerald-500/10 to-green-500/15",
      iconColor: "text-emerald-600",
      badgeBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
    };
  }

  if (norm.includes("libro") || norm.includes("educacion") || norm.includes("curso")) {
    return {
      Icon: BookOpen,
      gradient: "from-sky-500/15 via-blue-500/10 to-indigo-500/15",
      iconColor: "text-sky-600",
      badgeBg: "bg-sky-50 text-sky-700 border-sky-200",
    };
  }

  if (norm.includes("perfume") || norm.includes("belleza") || norm.includes("cosmetica")) {
    return {
      Icon: Sparkles,
      gradient: "from-fuchsia-500/15 via-pink-500/10 to-rose-500/15",
      iconColor: "text-fuchsia-600",
      badgeBg: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    };
  }

  return {
    Icon: Package,
    gradient: "from-slate-500/15 via-indigo-500/10 to-slate-500/15",
    iconColor: "text-slate-700",
    badgeBg: "bg-slate-100 text-slate-700 border-slate-200",
  };
}

/**
 * Formatea precios de manera amigable para la tienda.
 */
export function formatPrice(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return "$0";

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: num % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(num);
}

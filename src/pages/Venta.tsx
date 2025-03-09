import { Search } from "lucide-react";
import { useState } from "react";
import ProductoCard from "@/components/ProductoCard";
import CarritoVacio from "@/components/CarritoVacio";
import CarritoItem from "@/components/CarritoItem";
import { Producto, ItemCarrito } from "@/types/producto";

// Datos de productos
const productosData: Producto[] = [
  {
    id: 1,
    nombre: "Café Americano",
    precio: 25.00,
    imagen: "cafe-americano",
    categoria: "Bebidas"
  },
  {
    id: 2,
    nombre: "Café Latte",
    precio: 35.00,
    imagen: "cafe-latte",
    categoria: "Bebidas"
  },
  {
    id: 3,
    nombre: "Sandwich de Jamón",
    precio: 45.00,
    imagen: "sandwich-jamon",
    categoria: "Comidas"
  },
  {
    id: 4,
    nombre: "Ensalada César",
    precio: 60.00,
    imagen: "ensalada-cesar",
    categoria: "Comidas"
  },
  {
    id: 5,
    nombre: "Pastel de Chocolate",
    precio: 40.00,
    imagen: "pastel-chocolate",
    categoria: "Postres"
  },
  {
    id: 6,
    nombre: "Galletas",
    precio: 15.00,
    imagen: "galletas",
    categoria: "Snacks"
  },
  {
    id: 7,
    nombre: "Agua Mineral",
    precio: 18.00,
    imagen: "agua-mineral",
    categoria: "Bebidas"
  },
  {
    id: 8,
    nombre: "Refresco",
    precio: 22.00,
    imagen: "refresco",
    categoria: "Bebidas"
  },
  {
    id: 9,
    nombre: "Coca Cola",
    precio: 22.00,
    imagen: "coca-cola",
    categoria: "Bebidas"
  },
  {
    id: 10,
    nombre: "Pepsi",
    precio: 22.00,
    imagen: "pepsi",
    categoria: "Bebidas"
  }
];

const Venta = () => {
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [descuento, setDescuento] = useState(0);
  const [clienteSeleccionado, setClienteSeleccionado] = useState("Seleccionar cliente");

  // Filtrar productos por categoría y búsqueda
  const productosFiltrados = productosData.filter(producto => {
    const matchesCategoria = categoriaActiva === "Todos" || producto.categoria === categoriaActiva;
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategoria && matchesSearch;
  });

  // Categorías únicas
  const categorias = ["Todos", "Bebidas", "Comidas", "Postres", "Snacks"];

  // Agregar producto al carrito
  const agregarAlCarrito = (producto: Producto) => {
    setCarrito(prevCarrito => {
      const itemExistente = prevCarrito.find(item => item.producto.id === producto.id);
      
      if (itemExistente) {
        // Incrementar cantidad si ya existe
        return prevCarrito.map(item => 
          item.producto.id === producto.id 
            ? { ...item, cantidad: item.cantidad + 1 } 
            : item
        );
      } else {
        // Agregar nuevo item
        return [...prevCarrito, { producto, cantidad: 1 }];
      }
    });
  };

  // Incrementar cantidad de un producto en el carrito
  const incrementarCantidad = (productoId: number) => {
    setCarrito(prevCarrito => 
      prevCarrito.map(item => 
        item.producto.id === productoId 
          ? { ...item, cantidad: item.cantidad + 1 } 
          : item
      )
    );
  };

  // Decrementar cantidad de un producto en el carrito
  const decrementarCantidad = (productoId: number) => {
    setCarrito(prevCarrito => 
      prevCarrito.map(item => 
        item.producto.id === productoId && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 } 
          : item
      )
    );
  };

  // Eliminar producto del carrito
  const eliminarDelCarrito = (productoId: number) => {
    setCarrito(prevCarrito => 
      prevCarrito.filter(item => item.producto.id !== productoId)
    );
  };

  // Calcular subtotal
  const subtotal = carrito.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  
  // Calcular descuento
  const descuentoAmount = (subtotal * descuento) / 100;
  
  // Calcular total
  const total = subtotal - descuentoAmount;

  return (
    <div className="p-4 md:p-6 bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sección izquierda - Productos */}
        <div className="lg:col-span-3">
          {/* Barra de búsqueda */}
          <div className="relative w-full mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-md bg-secondary/30 border border-secondary text-sm text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Categorías */}
          <div className="flex overflow-x-auto mb-6">
            {categorias.map(categoria => (
              <button
                key={categoria}
                onClick={() => setCategoriaActiva(categoria)}
                className={`px-4 py-2 text-sm whitespace-nowrap ${
                  categoriaActiva === categoria
                    ? "bg-secondary text-white"
                    : "bg-secondary/10 text-gray-400 hover:bg-secondary/20"
                } ${categoria === "Todos" ? "rounded-l-md" : ""} ${categoria === "Snacks" ? "rounded-r-md" : ""}`}
              >
                {categoria}
              </button>
            ))}
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {productosFiltrados.map(producto => (
              <ProductoCard
                key={producto.id}
                nombre={producto.nombre}
                precio={producto.precio}
                imagen={producto.imagen}
                onClick={() => agregarAlCarrito(producto)}
              />
            ))}
          </div>
        </div>

        {/* Sección derecha - Carrito */}
        <div className="bg-card rounded-lg border border-secondary/20 p-4 h-fit">
          {/* Cliente */}
          <div className="mb-6">
            <h2 className="text-white font-medium mb-2">Cliente</h2>
            <div className="relative">
              <select
                value={clienteSeleccionado}
                onChange={(e) => setClienteSeleccionado(e.target.value)}
                className="w-full appearance-none bg-secondary/30 border border-primary text-sm text-white rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option>Seleccionar cliente</option>
                <option>María García</option>
                <option>Juan Pérez</option>
                <option>Carlos López</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Carrito */}
          <div className="mb-6">
            <h2 className="text-white font-medium mb-4">Carrito</h2>
            
            {carrito.length === 0 ? (
              <CarritoVacio />
            ) : (
              <div className="space-y-1">
                {carrito.map((item) => (
                  <CarritoItem
                    key={item.producto.id}
                    producto={item.producto}
                    cantidad={item.cantidad}
                    onIncrement={() => incrementarCantidad(item.producto.id)}
                    onDecrement={() => decrementarCantidad(item.producto.id)}
                    onRemove={() => eliminarDelCarrito(item.producto.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Descuento */}
          <div className="mb-4">
            <label htmlFor="descuento" className="block text-white font-medium mb-2">
              Descuento (%)
            </label>
            <input
              type="number"
              id="descuento"
              min="0"
              max="100"
              value={descuento}
              onChange={(e) => setDescuento(Number(e.target.value))}
              className="w-full bg-secondary/30 border border-secondary text-sm text-white rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Resumen */}
          <div className="space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Subtotal:</span>
              <span className="text-sm text-white">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-400">Descuento:</span>
              <span className="text-sm text-white">-${descuentoAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-sm text-gray-400">Total:</span>
              <span className="text-sm text-white">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Botón procesar venta */}
          <button
            className="w-full bg-gray-600 hover:bg-gray-500 text-white py-2 rounded-md text-sm font-medium transition-colors"
          >
            Procesar Venta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Venta;

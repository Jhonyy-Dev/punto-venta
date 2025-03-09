import { Search, Plus, MoreVertical, ChevronDown } from "lucide-react";
import { useState } from "react";
import ProductImage from "@/components/ProductImage";

// Definición de tipos para los productos
interface Producto {
  id: number;
  imagen: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  estado: "Activo" | "Inactivo";
}

const productosData: Producto[] = [
  {
    id: 1,
    imagen: "laptop",
    nombre: "Laptop HP Pavilion",
    descripcion: "Laptop HP Pavilion con procesador Intel i5, 8GB RAM",
    precio: 899.99,
    stock: 25,
    estado: "Activo"
  },
  {
    id: 2,
    imagen: "monitor",
    nombre: "Monitor LG 27\"",
    descripcion: "Monitor LG de 27 pulgadas, Full HD, IPS",
    precio: 249.99,
    stock: 15,
    estado: "Activo"
  },
  {
    id: 3,
    imagen: "teclado",
    nombre: "Teclado Mecánico Logitech",
    descripcion: "Teclado mecánico Logitech con retroiluminación RGB",
    precio: 94.99,
    stock: 30,
    estado: "Activo"
  },
  {
    id: 4,
    imagen: "mouse",
    nombre: "Mouse Inalámbrico",
    descripcion: "Mouse inalámbrico ergonómico con batería recargable",
    precio: 29.99,
    stock: 40,
    estado: "Activo"
  },
  {
    id: 5,
    imagen: "auriculares",
    nombre: "Auriculares Bluetooth",
    descripcion: "Auriculares Bluetooth con cancelación de ruido",
    precio: 79.99,
    stock: 20,
    estado: "Activo"
  },
  {
    id: 6,
    imagen: "tablet",
    nombre: "Tablet Samsung",
    descripcion: "Tablet Samsung de 10 pulgadas, 64GB de almacenamiento",
    precio: 349.99,
    stock: 12,
    estado: "Inactivo"
  },
  {
    id: 7,
    imagen: "impresora",
    nombre: "Impresora HP",
    descripcion: "Impresora multifuncional HP con WiFi",
    precio: 199.99,
    stock: 8,
    estado: "Activo"
  },
  {
    id: 8,
    imagen: "disco",
    nombre: "Disco Duro Externo",
    descripcion: "Disco duro externo de 1TB, USB 3.0",
    precio: 89.99,
    stock: 18,
    estado: "Activo"
  },
  {
    id: 9,
    imagen: "camara",
    nombre: "Cámara Web",
    descripcion: "Cámara web Full HD 1080p con micrófono incorporado",
    precio: 59.99,
    stock: 22,
    estado: "Activo"
  },
  {
    id: 10,
    imagen: "altavoces",
    nombre: "Altavoces Bluetooth",
    descripcion: "Altavoces Bluetooth portátiles con 10 horas de batería",
    precio: 69.99,
    stock: 2,
    estado: "Activo"
  }
];

const Productos = () => {
  const [productos] = useState<Producto[]>(productosData);
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState("Todos los estados");
  const [stockFilter, setStockFilter] = useState("Todo el stock");

  // Filtrar productos basado en la búsqueda
  const filteredProductos = productos.filter(producto => {
    const matchesSearch = producto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          producto.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesEstado = estadoFilter === "Todos los estados" || producto.estado === estadoFilter;
    
    return matchesSearch && matchesEstado;
  });

  return (
    <div className="p-4 md:p-6">
      {/* Encabezado */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Productos</h1>
          <p className="text-gray-400 text-sm">Gestiona tu inventario de productos</p>
        </div>
        <button className="bg-primary hover:bg-primary/90 text-white px-3 py-2 rounded-md flex items-center justify-center sm:justify-start gap-2 text-sm font-medium">
          <Plus size={16} />
          <span>Crear Producto</span>
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-card rounded-lg border border-secondary/20 overflow-hidden mb-6">
        <div className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          {/* Barra de búsqueda */}
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-3 py-2 rounded-md bg-secondary/30 border border-secondary text-sm text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <select
                value={estadoFilter}
                onChange={(e) => setEstadoFilter(e.target.value)}
                className="w-full appearance-none bg-secondary/30 border border-secondary text-sm text-muted-foreground rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option>Todos los estados</option>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                value={stockFilter}
                onChange={(e) => setStockFilter(e.target.value)}
                className="w-full appearance-none bg-secondary/30 border border-secondary text-sm text-muted-foreground rounded-md px-3 py-2 pr-8 focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option>Todo el stock</option>
                <option>Stock bajo</option>
                <option>Sin stock</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Tabla de productos */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-b border-secondary/20">
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Imagen</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Nombre</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 hidden md:table-cell">Precio</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400 hidden md:table-cell">Stock</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Estado</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-gray-400">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredProductos.map((producto) => (
                <tr key={producto.id} className="border-b border-secondary/20 hover:bg-secondary/10">
                  <td className="py-3 px-4">
                    <ProductImage type={producto.imagen} />
                  </td>
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm font-medium text-white">{producto.nombre}</p>
                      <p className="text-xs text-gray-400 hidden sm:block">{producto.descripcion}</p>
                      <div className="flex items-center gap-2 mt-1 sm:hidden">
                        <span className="text-xs text-white">${producto.precio.toFixed(2)}</span>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-xs text-white">Stock: {producto.stock}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span className="text-sm text-white">${producto.precio.toFixed(2)}</span>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <span className="text-sm text-white">{producto.stock}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-block text-xs px-2 py-1 rounded-full ${
                      producto.estado === "Activo" 
                        ? "bg-green-500/20 text-green-500" 
                        : "bg-gray-500/20 text-gray-400"
                    }`}>
                      {producto.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-gray-400 hover:text-white">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Productos;


import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Category {
  id: number;
  name: string;
}

const Categorias = () => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "categoría admin" }
  ]);

  return (
    <div className="animate-fade-in p-8">
      <div className="max-w-4xl mx-auto bg-card rounded-lg border border-border overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-medium">Categorías</h2>
            <div className="bg-primary h-5 w-5 flex items-center justify-center rounded-full">
              <span className="text-xs text-white font-medium">{categories.length}</span>
            </div>
          </div>
          
          <Button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-md text-sm flex items-center gap-1">
            <span className="text-sm font-medium">+</span>
            <span>Agregar Categoría</span>
          </Button>
        </div>
        
        <div className="divide-y divide-border">
          <div className="grid grid-cols-2 p-4 text-sm font-medium text-muted-foreground">
            <div>Nombre</div>
            <div className="text-right">Acciones</div>
          </div>
          
          {categories.map((category) => (
            <div key={category.id} className="grid grid-cols-2 p-4 items-center">
              <div>{category.name}</div>
              <div className="flex items-center justify-end gap-2">
                <button className="w-7 h-7 flex items-center justify-center rounded bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                
                <button className="w-7 h-7 flex items-center justify-center rounded bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
          
          {categories.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              No hay categorías. Agrega una para comenzar.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categorias;

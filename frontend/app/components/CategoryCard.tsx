import { Category } from "@/types";
import { Pencil, Trash2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
interface CategoryCardProps {
  category: Category;
  isOpen: boolean;
  onDelete: (id: number) => void;
  onEdit: (category: Category) => void;
}

export default function CategoryCard({
  category,
  isOpen,
  onDelete,
  onEdit,
}: CategoryCardProps) {
  return (
    <div
      className={cn(
        "flex justify-between items-center p-5 transition-all duration-300 rounded-xl",

        isOpen
          ? "bg-zinc-800/80 shadow-lg shadow-black/20"
          : "hover:bg-zinc-900/50",
      )}
    >
      <div className="flex items-center gap-4">
        <ChevronRight
          size={24}
          className={cn(
            "text-primary transition-transform duration-300",
            isOpen && "rotate-90",
          )}
        />

        <h2
          className={cn(
            "text-xl font-black uppercase italic transition-colors",
            isOpen ? "text-primary" : "text-white",
          )}
        >
          {category.name}
        </h2>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(category);
          }}
          className="p-2 hover:bg-zinc-700 rounded-full text-zinc-400 hover:text-white transition-colors"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(category.id);
          }}
          className="p-2 hover:bg-red-500/10 rounded-full text-zinc-400 hover:text-red-500 transition-colors"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

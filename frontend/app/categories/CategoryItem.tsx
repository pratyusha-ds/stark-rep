"use client";
import { useState } from "react";
import { Category } from "../../types/index";
// import { deleteCategoryAction } from "./actions";
import CategoryCard from "@/app/components/CategoryCard";
import ExerciseList from "@/app/components/ExerciseList";

export default function CategoryItem({ category }: { category: Category }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-900/50 mb-4">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        <CategoryCard
          category={category}
          isOpen={isOpen}
          onDelete={async (id) => {
            // if (confirm("Delete?")) await deleteCategoryAction(id);
          }}
          onEdit={(c) => console.log("Edit:", c)}
        />
      </div>
      {isOpen && (
        <ExerciseList
          exercises={category.exercises}
          onDeleteExercise={() => {}}
        />
      )}
    </div>
  );
}

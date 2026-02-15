import { Exercise } from "@/types";
import { Dumbbell, Trash2 } from "lucide-react";

interface ExerciseListProps {
  exercises: Exercise[];
  onDeleteExercise: (id: number) => void;
}

export default function ExerciseList({
  exercises,
  onDeleteExercise,
}: ExerciseListProps) {
  if (exercises.length === 0) {
    return (
      <div className="p-6 text-center text-zinc-500 italic border-t border-zinc-800">
        No exercises added yet.
      </div>
    );
  }

  return (
    <div className="bg-zinc-950/50 border-t border-zinc-800 animate-in fade-in slide-in-from-top-2 duration-300">
      <ul className="divide-y divide-zinc-900">
        {exercises.map((ex) => (
          <li
            key={ex.id}
            className="p-4 flex items-center justify-between hover:bg-zinc-900/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Dumbbell className="w-4 h-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium text-zinc-200">{ex.name}</p>
                <p className="text-xs text-zinc-500">
                  {/* {ex.sets} sets × {ex.reps} reps
                  {ex.weight ? ` • ${ex.weight}kg` : ''} */}
                </p>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteExercise(ex.id);
              }}
              className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

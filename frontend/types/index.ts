export interface Exercise {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  exercises: Exercise[];
}

export interface CategoryCardProps {
  category: Category;
  isOpen: boolean;
  onDelete: (id: number) => void;
  onEdit: (category: Category) => void;
}

export interface ExerciseListProps {
  exercises: Exercise[];
  onDeleteExercise: (id: number) => Promise<{ success: boolean; error?: string }>;
  onEditExercise: (exercise: Exercise) => void;
}

export interface EditTarget {
  id: number;
  name: string;
  type: 'category' | 'exercise';
}

export interface EditNameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newName: string) => void;
  initialName: string;
  title: string;
}

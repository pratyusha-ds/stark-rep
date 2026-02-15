export interface Exercise {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  exercises: Exercise[];
}
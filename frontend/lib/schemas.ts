import { z } from 'zod';
export const categoryTemplateSchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  exercises: z.array(
    z.object({
      name: z.string().min(1, 'Exercise name is required'),
    })
  ),
});

export const workoutLogSchema = z.object({
  exerciseId: z.number(),
  weight: z.coerce.number().min(0),
  reps: z.coerce.number().min(1),
  setNumber: z.number().optional(),
});

export type CategoryTemplateValues = z.infer<typeof categoryTemplateSchema>;
export type WorkoutLogValues = z.infer<typeof workoutLogSchema>;

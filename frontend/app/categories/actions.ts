'use server';

import { revalidatePath } from 'next/cache';
import { CategoryTemplateValues } from '@/lib/schemas';
import { API_BASE_URL } from '@/lib/constants';

// CREATE CATEGORY
export async function createCategoryAction(data: CategoryTemplateValues) {
  if (!data.name || data.name.trim() === '') {
    return { success: false, error: 'Category name is required' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.message || 'Failed to create category' };
    }

    revalidatePath('/categories');
    return { success: true };
  } catch (error) {
    console.error('Create Category Error:', error);
    return { success: false, error: 'Server connection failed' };
  }
}

// UPDATE CATEGORY
export async function updateCategoryNameAction(id: number, newName: string) {
  if (!id) return { success: false, error: 'Category ID is required' };
  if (!newName.trim()) return { success: false, error: 'New name cannot be empty' };

  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName.trim() }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.message || 'Failed to rename category' };
    }

    revalidatePath('/categories');
    return { success: true };
  } catch (error) {
    console.error('Update Category Error:', error);
    return { success: false, error: 'Server connection failed' };
  }
}

// DELETE CATEGORY
export async function deleteCategoryAction(id: number) {
  if (!id) return { success: false, error: 'Category ID is required for deletion' };

  try {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const result = await response.json();
      return { success: false, error: result.message || 'Failed to delete category' };
    }

    revalidatePath('/categories');
    return { success: true };
  } catch (error) {
    console.error('Delete Category Error:', error);
    return { success: false, error: 'Server connection failed' };
  }
}

// CREATE EXERCISE
export async function createExerciseAction(categoryId: number, name: string) {
  if (!categoryId || !name.trim()) {
    return { success: false, error: 'Missing Category ID or Exercise Name' };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/exercises`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), categoryId }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.message || 'Failed to add exercise' };
    }

    revalidatePath('/categories');
    return { success: true };
  } catch (error) {
    console.error('Create Exercise Error:', error);
    return { success: false, error: 'Server connection failed' };
  }
}

// UPDATE EXERCISE
export async function updateExerciseAction(id: number, name: string) {
  if (!id) return { success: false, error: 'Exercise ID is required' };
  if (!name.trim()) return { success: false, error: 'Exercise name cannot be empty' };

  try {
    const response = await fetch(`${API_BASE_URL}/exercises/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim() }),
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false, error: result.message || 'Failed to update exercise' };
    }

    revalidatePath('/categories');
    return { success: true };
  } catch (error) {
    console.error('Update Exercise Error:', error);
    return { success: false, error: 'Server connection failed' };
  }
}

// DELETE EXERCISE
export async function deleteExerciseAction(exerciseId: number) {
  if (!exerciseId) return { success: false, error: 'Exercise ID is required for deletion' };

  try {
    const response = await fetch(`${API_BASE_URL}/exercises/${exerciseId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      const result = await response.json();
      return { success: false, error: result.message || 'Failed to delete exercise' };
    }

    revalidatePath('/categories');
    return { success: true };
  } catch (error) {
    console.error('Delete Exercise Error:', error);
    return { success: false, error: 'Server connection failed' };
  }
}

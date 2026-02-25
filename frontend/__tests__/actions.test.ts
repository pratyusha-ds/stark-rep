import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import {
  createCategoryAction,
  deleteCategoryAction,
  updateCategoryNameAction,
  createExerciseAction,
  updateExerciseAction,
  deleteExerciseAction,
} from '@/app/categories/actions';

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
  revalidateTag: vi.fn(),
}));

global.fetch = vi.fn();
const mockedFetch = fetch as Mock;

describe('Server Actions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Category Actions', () => {
    it('should return error if category name is empty', async () => {
      const result = await createCategoryAction({ name: '', exercises: [] });
      expect(result.success).toBe(false);
      expect(result.error).toBe('Category name is required');
    });

    it('should return success if create API call works', async () => {
      mockedFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ id: 1, name: 'Chest' }),
      });
      const result = await createCategoryAction({ name: 'Chest', exercises: [] });
      expect(result.success).toBe(true);
    });

    it('should return error if update name is empty', async () => {
      const result = await updateCategoryNameAction(1, '  ');
      expect(result.success).toBe(false);
      expect(result.error).toBe('New name cannot be empty');
    });

    it('should return error if delete is called without an ID', async () => {
      // @ts-expect-error - Testing invalid input
      const result = await deleteCategoryAction(undefined);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Category ID is required for deletion');
    });
  });

  describe('Exercise Actions', () => {
    it('should return error if exercise name is empty', async () => {
      const result = await createExerciseAction(1, '');
      expect(result.success).toBe(false);
      expect(result.error).toContain('Exercise Name');
    });

    it('should return success if exercise update works', async () => {
      mockedFetch.mockResolvedValue({
        ok: true,
        json: async () => ({ id: 10, name: 'Bench Press' }),
      });
      const result = await updateExerciseAction(10, 'Incline Press');
      expect(result.success).toBe(true);
    });
  });

  describe('Error Handling (Catch Blocks)', () => {
    it('should handle server connection failure (Network Down)', async () => {
      mockedFetch.mockRejectedValue(new Error('Network Down'));
      const result = await deleteExerciseAction(1);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Server connection failed');
    });

    it('should handle API 500 errors', async () => {
      mockedFetch.mockResolvedValue({
        ok: false,
        json: async () => ({ message: 'Database Error' }),
      });
      const result = await createCategoryAction({ name: 'Back', exercises: [] });
      expect(result.success).toBe(false);
      expect(result.error).toBe('Database Error');
    });
  });
});

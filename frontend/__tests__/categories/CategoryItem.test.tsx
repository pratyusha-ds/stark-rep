import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CategoryItem from '@/app/categories/CategoryItem';

vi.mock('@/app/categories/actions', () => ({
  deleteCategoryAction: vi.fn(),
  deleteExerciseAction: vi.fn(),
  updateCategoryAction: vi.fn(),
  updateExerciseAction: vi.fn(),
}));

const mockCategory = {
  id: 1,
  name: 'Strength',
  exercises: [{ id: 1, name: 'Deadlift' }],
};

describe('CategoryItem Component', () => {
  it('toggles the exercise list when clicked', async () => {
    render(<CategoryItem category={mockCategory} />);
    const card = screen.getByText('Strength');
    fireEvent.click(card);

    expect(await screen.findByText('Deadlift')).toBeInTheDocument();
  });

  it('opens delete confirmation modal when the delete icon is clicked', async () => {
    render(<CategoryItem category={mockCategory} />);

    const deleteBtn = screen.getAllByRole('button')[1];
    fireEvent.click(deleteBtn);

    const heading = await screen.findByRole('heading', { name: /Delete/i });
    expect(heading).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ExerciseCard } from '@/components/history/summary/ExerciseCard';
import { WorkoutSetDTO } from '@/types';

describe('ExerciseCard Component', () => {
  const mockSets: WorkoutSetDTO[] = [
    { id: 1, exerciseName: 'Deadlift', weight: 140, reps: 5, exerciseId: 101, date: '2026-03-12' },
  ];

  const mockOnDelete = vi.fn();
  const mockOnUpdate = vi.fn();

  const defaultProps = {
    exerciseName: 'Deadlift',
    sets: mockSets,
    onDelete: mockOnDelete,
    onUpdate: mockOnUpdate,
  };

  it('shows the delete confirmation modal when trash is clicked', async () => {
    render(<ExerciseCard {...defaultProps} />);

    const trashBtn = screen.getByLabelText('delete-set');
    fireEvent.click(trashBtn);

    const modalHeading = await screen.findByText(/Remove Set\?/i);
    expect(modalHeading).toBeInTheDocument();
  });

  it('calls onDelete when confirm delete is clicked', async () => {
    render(<ExerciseCard {...defaultProps} />);

    fireEvent.click(screen.getByLabelText('delete-set'));

    const confirmBtn = await screen.findByRole('button', { name: /^Delete$/ });
    fireEvent.click(confirmBtn);

    expect(mockOnDelete).toHaveBeenCalledWith(1);
  });

  it('calls onUpdate when input loses focus (onBlur)', () => {
    render(<ExerciseCard {...defaultProps} />);
    const weightInput = screen.getByDisplayValue('140');
    fireEvent.change(weightInput, { target: { value: '150' } });
    fireEvent.blur(weightInput);
    expect(mockOnUpdate).toHaveBeenCalledWith(1, 150, 5);
  });
});

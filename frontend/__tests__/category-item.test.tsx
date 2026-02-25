import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import CategoryItem from '@/app/categories/CategoryItem';

const mockCategory = {
  id: 1,
  name: 'Strength',
  exercises: [{ id: 1, name: 'Deadlift' }],
};

describe('CategoryItem Component', () => {
  it('toggles the exercise list when clicked', () => {
    render(<CategoryItem category={mockCategory} />);

    const card = screen.getByText('Strength');
    fireEvent.click(card);

    expect(screen.getByText('Deadlift')).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Header from '@/components/exercises/Header';

describe('Header Component', () => {
  const mockProps = {
    exerciseName: 'Squats',
    onFinish: vi.fn(),
    onViewSummary: vi.fn(),
  };

  it('renders the exercise name correctly', () => {
    render(<Header {...mockProps} />);
    expect(screen.getByText(/SQUATS/i)).toBeInTheDocument();
  });

  it('calls onFinish when Finish Workout button is clicked', () => {
    render(<Header {...mockProps} />);
    const finishBtn = screen.getByText(/FINISH WORKOUT/i);
    fireEvent.click(finishBtn);
    expect(mockProps.onFinish).toHaveBeenCalledTimes(1);
  });

  it('calls onViewSummary when View Summary button is clicked', () => {
    render(<Header {...mockProps} />);
    const summaryBtn = screen.getByRole('button', { name: /VIEW SUMMARY/i });
    fireEvent.click(summaryBtn);
    expect(mockProps.onViewSummary).toHaveBeenCalledTimes(1);
  });
});

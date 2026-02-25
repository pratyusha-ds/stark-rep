import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, type Mock } from 'vitest';
import CategoryList from '@/app/categories/CategoryList';

global.fetch = vi.fn();
const mockedFetch = fetch as Mock;

describe('CategoryList Component', () => {
  it('shows "No results found" when the list is empty', async () => {
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    const result = await CategoryList({ query: 'Zumba' });
    render(result);

    expect(screen.getByText(/No results found for "Zumba"/i)).toBeInTheDocument();
  });

  it('renders "System Offline" box when fetch fails', async () => {
    mockedFetch.mockResolvedValue({ ok: false });

    const result = await CategoryList({ query: '' });
    render(result);

    expect(screen.getByText(/System Offline/i)).toBeInTheDocument();
    expect(screen.getByText(/Please try again after a while/i)).toBeInTheDocument();
  });

  it('renders category items when data is returned', async () => {
    mockedFetch.mockResolvedValue({
      ok: true,
      json: async () => [
        { id: 1, name: 'Legs', exercises: [] },
        { id: 2, name: 'Arms', exercises: [] },
      ],
    });

    const result = await CategoryList({ query: '' });
    render(result);

    expect(screen.getByText('Legs')).toBeInTheDocument();
    expect(screen.getByText('Arms')).toBeInTheDocument();
  });
});

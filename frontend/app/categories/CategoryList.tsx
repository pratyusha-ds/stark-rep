import { Category } from '@/types';
import CategoryItem from './CategoryItem';
import { API_BASE_URL } from '@/lib/constants';

export default async function CategoryList({ query }: { query: string }) {
  try {
    const res = await fetch(`${API_BASE_URL}/categories?search=${encodeURIComponent(query)}`, {
      cache: 'no-store',
      next: { tags: ['categories'] },
    });

    if (!res.ok) throw new Error('Failed to fetch');

    const categories: Category[] = await res.json();

    if (categories.length === 0) {
      return (
        <div className="text-center p-12 border-2 border-dashed border-zinc-900 rounded-3xl">
          <p className="text-zinc-500 font-medium italic">
            No results found for &quot;{query}&quot;
          </p>
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-4">
        {categories.map((cat) => (
          <CategoryItem key={cat.id} category={cat} />
        ))}
      </div>
    );
  } catch (error) {
    return (
      <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center">
        <p className="font-bold uppercase tracking-widest text-xs mb-2">System Offline.</p>
        <p className="text-sm">Please try again after a while.</p>
      </div>
    );
  }
}

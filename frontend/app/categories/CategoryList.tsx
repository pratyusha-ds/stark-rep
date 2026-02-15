import { Category } from "../../types/index";
import CategoryItem from "./CategoryItem";

export default async function CategoryList({ query }: { query: string }) {
  const res = await fetch(
    `http://localhost:8080/api/categories?search=${query}`,
    { cache: "no-store" },
  );
  const categories: Category[] = await res.json();

  if (categories.length === 0)
    return <p className="text-zinc-500 italic">No categories found.</p>;

  return (
    <>
      {categories.map((cat) => (
        <CategoryItem key={cat.id} category={cat} />
      ))}
    </>
  );
}

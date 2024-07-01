"use client";
import CategoryPage from "@/components/CategoryPage";

export default function Page({
  params,
}: {
  params: {
    category: string;
  };
}) {
  const category = params.category;

  return (
    <div className="min-h-screen bg-primary-foreground">
      <div className="h-24 flex bg-primary items-center px-24 font-bold text-4xl font-serif">
        {decodeURIComponent(category)}
      </div>

      <CategoryPage category={category} />
    </div>
  );
}

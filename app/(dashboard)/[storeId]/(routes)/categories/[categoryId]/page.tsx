import prismadb from "@/lib/prismadb";

import { CategoryForm } from "./components/category-form";

type PageProps = {
  params: Promise<{ storeId: string; categoryId: string }>;
};

export default async function CategoryPage({ params }: PageProps) {
  const { categoryId, storeId } = await params;
  const category = await prismadb.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  const billboards = await prismadb.billboard.findMany({
    where: { storeId: storeId },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
}

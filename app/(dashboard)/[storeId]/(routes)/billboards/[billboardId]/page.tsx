import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

type PageProps = {
  params: Promise<{ storeId: string; billboardId: string }>;
};

export default async function BillboardPage({ params }: PageProps) {
  const { billboardId } = await params;
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: billboardId,
    },
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
}

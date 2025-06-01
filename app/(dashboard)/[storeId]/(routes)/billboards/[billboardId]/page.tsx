import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

type Props = {
  params: {
    storeId: string;
    billboardId: string;
  };
};

const BillboardPage = async ({ params }: Props) => {
  const billboard = await prismadb.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;

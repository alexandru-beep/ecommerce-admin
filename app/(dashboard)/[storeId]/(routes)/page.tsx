interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage = async ({ params }: DashboardPageProps) => {
  return (
    <div className="flex-col">
      This is Dashboard!
    </div>
  );
};

export default DashboardPage;

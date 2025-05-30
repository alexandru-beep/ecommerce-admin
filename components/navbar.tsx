import { UserButton, auth } from "@clerk/nextjs";
import { MainNav } from "@/components/main-nav";
import { redirect } from "next/navigation";
import prismadb from "@/lib/prismadb";
import StoreSwitcher from "@/components/store-switcher";

const Navbar = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <MainNav className="m-6 hidden sm:block" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

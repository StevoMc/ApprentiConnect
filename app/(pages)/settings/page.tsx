import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";

const SettingsPage = async () => {
  const handleClick = async () => {
    "use server";
    const session = await getServerSession();
    const email = session?.user?.email;
    if (!email) return;
    const user = await prisma?.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) return;
    const deleted = await prisma?.user.delete({
      where: {
        id: user.id,
      },
    });
    console.log(deleted);
    signOut()
  };

  return (
    <>
      <form action={handleClick}>
        <Button variant="destructive">Delete User</Button>
      </form>
    </>
  );
};

export default SettingsPage;

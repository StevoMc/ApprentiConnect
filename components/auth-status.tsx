import { getServerSession } from "next-auth/next";
import prisma from "@/lib/prisma";

export default async function AuthStatus() {
  const session = await getServerSession();
  const user = session?.user;
  const email = user?.email ?? "";

  const currentUser = await prisma?.user.findFirst({
    where: {
      email,
    },
  });

  return (
    <div className="z-52 absolute top-5 flex w-full items-center justify-center">
      {session && (
        <p className="dark: text-sm text-foreground/60">
          Welcome {currentUser?.firstname} {currentUser?.lastname}
          {/* Signed in as {session.user?.email} */}
        </p>
      )}
    </div>
  );
}

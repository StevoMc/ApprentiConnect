import { getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await getServerSession();
  const user = session?.user;
  const email = user?.email ?? "";

  const currentUser = await prisma?.user.findUnique({
    where: {
      email,
    },
  })



  return (
    <div className="absolute z-52 top-5 flex w-full items-center justify-center">
      {session && (
        <p className="text-sm text-foreground/60 dark:">
          Welcome {currentUser?.firstname} {currentUser?.lastname}
          {/* Signed in as {session.user?.email} */}
        </p>
          ) }
    </div>
  );
}

import { getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await getServerSession();
  const user = session?.user;

  return (
    <div className="z-52 absolute top-5 flex w-full items-center justify-center">
      {session && (
        <p className="dark: text-sm text-foreground/60">
          Welcome {user?.name}
          {/* Signed in as {session.user?.email} */}
        </p>
      )}
    </div>
  );
}

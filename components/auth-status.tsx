import { getServerSession } from "next-auth/next";

export default async function AuthStatus() {
  const session = await getServerSession();
  return (
    <div className="absolute z-52 top-5 flex w-full items-center justify-center">
      {session && (
        <p className="text-sm text-foreground/60 dark:">
          Signed in as {session.user?.email}
        </p>
      )}
    </div>
  );
}

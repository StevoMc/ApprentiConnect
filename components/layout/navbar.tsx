"use client";

import Image from "next/image";
import Link from "next/link";
import useScroll from "@/lib/hooks/use-scroll";
import { useSignInModal } from "./sign-in-modal";
import UserDropdown from "./user-dropdown";
import { Session } from "next-auth";
import { ModeToggle } from "components/shared/mode-toggle";
import { ActionTooltip } from "components/shared/action-tooltip";
import { useRouter } from "next/navigation";

export default function NavBar({ session }: { session: Session | null }) {
  // const { SignInModal, setShowSignInModal } = useSignInModal();
  const router = useRouter();
  const scrolled = useScroll(50);

  return (
    <>
      {/* <SignInModal /> */}
      <div
        className={`fixed top-0 flex w-full justify-center ${
          scrolled
            ? "border-b bg-background/50 backdrop-blur-md dark:bg-secondary/70"
            : "bg-white/0"
        } z-30`}
      >
        <div className="mx-5 flex h-16 w-full max-w-screen-xl items-center justify-between">
          <Link href="/" className="flex items-center font-display text-2xl">
            <Image
              src="/logo.png"
              alt="Logo"
              width="30"
              height="30"
              className="mr-2 rounded-sm"
            />
            <p>ApprentiConnect</p>
          </Link>
          <div className="z-40 ml-auto mr-2">
            <ActionTooltip side="bottom" align="center" label="Theme">
              <div className="h-fit w-fit">
                <ModeToggle />
              </div>
            </ActionTooltip>
          </div>

          {session ? (
            <UserDropdown session={session} />
          ) : (
            <button
              className="inline-flex h-9 w-9 items-center justify-center whitespace-nowrap rounded-md border border-input bg-secondary px-9 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
              // border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:bg-white hover:text-black
              onClick={() => router.push("/signin")}
            >
              <p className="flex items-center justify-center p-2">Sign In</p>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

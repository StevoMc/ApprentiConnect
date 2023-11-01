"use client";

import { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import useRedirectAfterSomeSeconds from "@/lib/hooks/use-redirect-timer";
import { LucideHeartHandshake } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignOutCard() {
  const { secondsRemaining } = useRedirectAfterSomeSeconds("/", 5);

  useEffect(() => {
    if (secondsRemaining <= 1) signOut();
  }, [secondsRemaining]);

  return (
    <>
      <div className="fixed inset-0 flex flex-col items-center justify-center">
        <LucideHeartHandshake className="h-24 w-24" />
        <h2 className="m-4 text-opacity-80">Goodbye</h2>
        <p className="text-muted-foreground">
          Redirecting in {secondsRemaining} seconds
        </p>
      </div>
    </>
  );
}

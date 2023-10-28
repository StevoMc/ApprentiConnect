"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { LayoutDashboard, LogOut, Settings2 } from "lucide-react";
import Popover from "components/shared/popover";
import Image from "next/image";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { v5 as uuid } from "uuid";

export default function UserDropdown({ session }: { session: Session }) {
  const { email, image } = session?.user || {};
  const [openPopover, setOpenPopover] = useState(false);
  const router = useRouter();

  if (!email) return null;

  return (
    <div className="relative inline-block text-left">
      <Popover
        content={
          <div className="w-full rounded-md bg-card p-2 sm:w-56">
            <div className="p-2">
              {session?.user?.name && (
                <p className="truncate text-sm font-medium text-gray-900">
                  {session?.user?.name}
                </p>
              )}
              <p className="truncate text-sm text-gray-500">
                {session?.user?.email}
              </p>
            </div>

            <button
              className="cursor-cursor relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-accent"
              onClick={() => {
                router.push("/dashboard");
                setOpenPopover(false);
              }}
            >
              <LayoutDashboard className="h-4 w-4" />
              <p className="text-sm">Dashboard</p>
            </button>
            <button
              className="cursor-cursor relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-accent"
              onClick={() => {
                router.push("/settings");
                setOpenPopover(false);
              }}
            >
              <Settings2 className="h-4 w-4" />
              <p className="text-sm">Settings</p>
            </button>
            <Button
              variant={"outline"}
              className="relative flex w-full items-center justify-start space-x-2 rounded-md p-2 text-left text-sm transition-all duration-75 hover:bg-accent"
              onClick={() => signOut()}
            >
              <LogOut className="h-4 w-4" />
              <p className="text-sm">Logout</p>
            </Button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-9 sm:w-9"
        >
          <Image
            alt={email}
            src={
              image ||
              `https://api.dicebear.com/7.x/personas/png?seed=${uuid(
                email || "",
                "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
              )}&scale=135&radius=50`
            }
            width={40}
            height={40}
          />
        </button>
      </Popover>
    </div>
  );
}

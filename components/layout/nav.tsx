import Navbar from "./navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";

export default async function Nav() {
  const session = await getServerSession();
  return <Navbar session={session} />;
}

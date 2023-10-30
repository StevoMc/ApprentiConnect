import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const SignOutModal = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <Button variant={"secondary"} onClick={() => router.back()}>Go Back</Button>
      <Button variant={"destructive"} onClick={() => router.refresh()}>Sign Out</Button>
    </div>
  );
};

export default SignOutModal;

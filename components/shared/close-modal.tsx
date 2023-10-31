"use client";

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const CloseModal = () => {
  const router = useRouter();
  return (
    <>
      <Button
        variant={"ghost"}
        aria-label="close modal"
        className="h-6 w-6 rounded-md p-0"
        onClick={() => router.back()}
      >
        <X className="h-4 w-4" />
      </Button>
    </>
  );
};

export default CloseModal;

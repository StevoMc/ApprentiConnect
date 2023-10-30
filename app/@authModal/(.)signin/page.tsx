import SignInCard from "@/app/(auth)/signin/page";
import CloseModal from "@/components/shared/close-modal";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = () => {
  return (
    <div className="fixed inset-0 z-50 bg-gray-500/40 backdrop-blur-xl overflow-hidden">
      <div className="container mx-auto flex h-full max-w-lg items-center">
        <div className="relative h-fit w-full rounded-lg">
          <div className="absolute right-4 top-4">
            <CloseModal />
          </div>
          <SignInCard />
        </div>
      </div>
    </div>
  );
};

export default page;

import { ArrowBigUp } from "lucide-react";
import ReportCard from "../report-card";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import ViewPDF from "@/app/pdf/page";

const ReportPage = async ({ params }: { params: { reportId: string } }) => {
  if (!params?.reportId) return null;
  const rep = await prisma?.report?.findUnique({
    where: { id: Number(params?.reportId) },
  });
  if (!rep?.id) return null;
  return (
    <>
      <Button className="fixed right-4 top-16">
        <ArrowBigUp className="h-4 w-4" />
      </Button>

      <div className="mt-16 h-screen  w-full">
        <h1 className="text-4xl font-bold">Report</h1>

        <div className="flex flex-col items-center justify-center ">
          <div className="w-full p-4">
            ReportId: {params?.reportId}
            <ReportCard {...rep} />
          </div>
          <div className="h-[100vh] w-full">
            <ViewPDF />
          </div>
        </div>
      </div>
    </>
  );
};
export default ReportPage;

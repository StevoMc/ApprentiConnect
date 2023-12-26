import { ArrowBigUp } from "lucide-react";
import ReportCard from "../report-card";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import ViewPDF from "@/app/(pages)/pdf/pdfview";
import { getServerSession } from "next-auth";

const ReportPage = async ({ params }: { params: { reportId: string } }) => {
  const session = await getServerSession();
  const user = session?.user;
  const email = user?.email;

  if (!session || !email) return null;

  const profile = await prisma?.user?.findUnique({
    where: {
      email,
    },
  });

  if (!profile) return null;

  const id = Number(params?.reportId);
  if (!params?.reportId) return null;
  const reports = await prisma?.report?.findMany({
    where: { OR: [{ id: id }, { authorId: profile.id }] },
  });

  if (!reports || reports.length <= 0) return null;

  return (
    <>
      <Button className="fixed right-4 top-16">
        <ArrowBigUp className="h-4 w-4" />
      </Button>

      <div className="mt-16 h-screen  w-full">
        <h1 className="text-4xl font-bold">Report</h1>

        <div className="flex flex-col items-center justify-center ">
          <div className="h-[100vh] w-full">
          <ViewPDF profile={profile} reports={reports} />
          </div>
          {reports.map((report) => {
            return (
              <>
                <div key={report.id} className="w-full p-4">
                  ReportId: {params?.reportId}
                <ReportCard {...report} />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default ReportPage;

import { useParams, usePathname } from "next/navigation";
import ReportCard from "../report-card";
import prisma from "@/lib/prisma";

const ReportPage = async ({ params }: { params: { reportId: string } }) => {
  if (!params?.reportId) return null;
  const rep = await prisma?.report?.findUnique({
    where: { id: Number(params?.reportId) },
  });
  if (!rep?.id) return null;
  return (
    <>
      ReportId: {params?.reportId}
      <ReportCard {...rep} />
    </>
  );
};

export default ReportPage;

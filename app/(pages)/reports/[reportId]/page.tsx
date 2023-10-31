import { useParams, usePathname } from "next/navigation";
import ReportCard from "../report-card";
import prisma from "@/lib/prisma";

type ReportCardProps = {
  id: number;
  title: string;
  content: string | null;
  published: boolean;
  authorId: string | null;
  createdAt: Date;
  updatedAt: Date;
  date: Date;
  params: { reportId: string };
};

const ReportPage = async ({ params, ...report }: Partial<ReportCardProps>) => {
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

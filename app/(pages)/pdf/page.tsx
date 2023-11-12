import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import ViewPDF from "./pdfview";

const PDFPage = async () => {
  const session = await getServerSession();
  const user = session?.user;
  const email = user?.email;

  if (!session || !user || !email) return null;

  const profile = await prisma?.user.findUnique({
    where: {
      email,
    },
  });

  if (!profile) return null;

  const authorId = profile.id;

  if (!authorId) return null;

  const latestReportDate = await prisma?.report?.findMany({
    where: {
      authorId,
    },
    orderBy: [{ date: "desc" }],
    take: 1,
  });

  function calcWeekStart(): Date {
    const start = latestReportDate?.[0]?.date || new Date();
    const dayOfWeek = start.getDay();
    const difference = start.getDate() - dayOfWeek;
    return new Date(start.setDate(difference));
  }
  function calcWeekEnd(): Date {
    const thisWeekStartDate = calcWeekStart();
    const friday = 5;
    const difference = friday - thisWeekStartDate.getDay();
    return new Date(
      thisWeekStartDate.setDate(thisWeekStartDate.getDate() + difference),
    );
  }
  const thisWeekStart = calcWeekStart();
  const thisWeekEnd = calcWeekEnd();

  const reports = await prisma?.report?.findMany({
    where: {
      authorId,
      date: {
        gte: thisWeekStart,
        lte: thisWeekEnd,
      },
    },
    orderBy: {
      date: "asc",
    },
  });

  if (!reports || reports.length <= 0) return null;

  return (
    <>
      <ViewPDF profile={profile} reports={reports} />
    </>
  );
};

export default PDFPage;

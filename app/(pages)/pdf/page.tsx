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

  function calcWeekStart(): Date {
    const today = new Date();
    const dayOfWeek = today.getDay();
    const difference = today.getDate() - dayOfWeek;
    return new Date(today.setDate(difference));
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
  const thisWeekEnd = calcWeekEnd()

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
      <div className="mt-16 h-[100vh] w-full">
        <ViewPDF profile={profile} reports={reports} />
      </div>
    </>
  );
};

export default PDFPage;

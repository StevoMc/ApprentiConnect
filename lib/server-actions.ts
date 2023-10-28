import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export const addReport = async (formData: FormData) => {
  "use server";

  const session = await getServerSession();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const user = session?.user;

  if (!user || !title || !content) return;

  const authorId = await prisma?.user
    .findFirst({
      where: {
        email: user.email,
      },
    })
    .then((e) => e?.id);

  if (!authorId) return;

  const data = { title, content, authorId };

  console.log(data);

  await prisma?.report.create({
    data,
  });
};

export const getReports = async () => {
  "use server";
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return;
  const authorId = await prisma?.user
    .findFirst({
      where: {
        email: user.email,
      },
    })
    .then((e) => e?.id);
  if (!authorId) return;
  const reports = await prisma?.report.findMany({
    where: {
      authorId,
    },
  });
  return reports;
};

export const setPublished = async (id: number) => {
  "use server";
  await prisma?.report.update({
    where: {
      id: id,
    },
    data: {
      published: true,
    },
  });
};

const actions = { addReport, getReports, setPublished };

export default actions;

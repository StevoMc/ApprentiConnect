"use server";

import prisma from "@/lib/prisma";
import { Report } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";

export const addReport = async (formData: FormData) => {
  const session = await getServerSession();

  const dateStr = formData.get("date")?.toString() ?? "";
  const dateParsed = new Date(dateStr).toDateString();
  const date = new Date(Date.parse(dateParsed) + 86400000) ?? null;

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const user = session?.user;

  if (!user || !title || !content || !date) return;

  const authorId = await prisma?.user
    ?.findFirst({
      where: {
        email: user.email,
      },
    })
    .then((e) => e?.id);

  if (!authorId) return;

  const data = { title, content: [content], authorId, date };

  // If Report exists with the same day: append the data, else create new report.
  const reportExists = await prisma?.report?.findMany({
    where: {
      AND: [
        { authorId: data?.authorId },
        { title: data?.title },
        { date: data?.date },
      ],
    },
  });

  if (reportExists.length > 0) {
    const reportUpdated = await prisma?.report?.updateMany({
      where: {
        AND: [
          { authorId: data?.authorId },
          { title: data?.title },
          { date: data?.date },
        ],
      },
      data: { content: [...reportExists[0]?.content, content] },
    });
    revalidateTag("reports");
    return { success: true };
  }

  const reportCreated = await prisma?.report?.create({
    data,
  });

  revalidatePath("/reports");
  return { success: true };
};

export const getReports = async () => {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return;
  const authorId = await prisma?.user
    ?.findFirst({
      where: {
        email: user.email,
      },
    })
    .then((e) => e?.id);
  if (!authorId) return;
  const reports = await prisma?.report?.findMany({
    where: {
      OR: [{ authorId }, { published: true }],
    },
    orderBy: {
      date: "desc",
    },
  });
  return reports;
};

export const setPublished = async (id: number, state: boolean) => {
  await prisma?.report?.update({
    where: {
      id,
    },
    data: {
      published: state,
    },
  });
  revalidatePath("/reports");
  return { success: true };
};

export const removeReport = async (id: number): Promise<Report | null> => {
  const session = await getServerSession();

  if (!session?.user?.email) return null;
  const authorId = await prisma?.user
    ?.findUnique({
      where: { email: session?.user?.email },
    })
    .then((e) => e?.id);
  try {
    if (!authorId) return null;
    const report = await prisma?.report?.delete({
      where: {
        id,
        authorId,
      },
    });
    revalidatePath("/reports");
    return report;
  } catch (error) {
    console.error(error);
  }

  return null;
};

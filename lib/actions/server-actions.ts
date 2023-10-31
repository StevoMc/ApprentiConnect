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

  const data = { title, content, authorId, date };

  await prisma?.report?.create({
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
      authorId,
    },
    orderBy: {
      createdAt: "desc",
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

export const removeReport = async (id: number): Promise<Report> => {
  const report = await prisma?.report?.delete({
    where: {
      id,
    },
  });
  revalidatePath("/reports");
  return report;
};

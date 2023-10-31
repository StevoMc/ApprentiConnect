"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { revalidateTag } from "next/cache";

export const addReport = async (formData: FormData) => {
  const session = await getServerSession();

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const user = session?.user;

  if (!user || !title || !content) return;

  const authorId = await prisma?.user
    ?.findFirst({
      where: {
        email: user.email,
      },
    })
    .then((e) => e?.id);

  if (!authorId) return;

  const data = { title, content, authorId };

  await prisma?.report?.create({
    data,
  });
  revalidateTag("/reports");
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
  revalidateTag("/reports");
  return { success: true };
};

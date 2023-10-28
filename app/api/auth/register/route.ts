import prisma from "@/lib/prisma";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { firstname, lastname, email, password } = await req.json();
  const exists = await prisma?.user.findUnique({
    where: {
      email,
    },
  });
  if (exists) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  } else {
    const user = await prisma?.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: await hash(password, 10),
      },
    });

    // Return user without password?
    const responseUser = { ...user, password: null };

    return NextResponse.json(responseUser);
  }
}

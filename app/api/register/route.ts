import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export const POST = async (req: NextRequest) => {
  const { email, password, name }: { email: string; password: string, name:string } =
    await req.json();

  if (!email || !password || !name)
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 }
    );
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser)
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  const hashedPassword = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });
  return NextResponse.json(
    { message: "You've successfully registered" },
    { status: 200 }
  );
};

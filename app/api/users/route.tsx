import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import UserClass from '../services';

interface UserI {
  name: string;
  email: string;
}

export const GET = async (req: NextRequest, res: NextResponse) => {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { status: 200 });
};

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body: UserI = await req.json();
  const { name, email } = body;
  if (!name || !email)
    return NextResponse.json({ error: 'Field Missing' }, { status: 400 });
  const existingUser = await UserClass.checkExisitingUser(undefined, email);
  if (existingUser)
    return NextResponse.json(
      { error: 'user with the provided email already exists' },
      { status: 404 }
    );
  const user = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  return NextResponse.json(user, { status: 201 });
};

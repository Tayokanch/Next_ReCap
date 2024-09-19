import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import UserClass from '../../services';
interface Props {
  params: { id: string };
}
export const GET = async (req: NextRequest, { params: { id } }: Props) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user)
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  return NextResponse.json({ user }, { status: 200 });
};

export const PUT = async (req: NextRequest, { params: { id } }: Props) => {
  const body: { name: string; email: string } = await req.json();

  if (!id)
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  if (!body.name)
    return NextResponse.json({ error: 'name is required' }, { status: 400 });
  const checkUser = await UserClass.checkExisitingUser(id, undefined);
  if (!checkUser)
    return NextResponse.json(
      { error: 'user with the provided params not found' },
      { status: 404 }
    );
  const updatedUser = await prisma.user.update({
    where: { id },
    data: {
      name: body.name,
      email: body.email,
    },
  });
  return NextResponse.json(updatedUser, { status: 200 });
};

export const DELETE = async (res: NextRequest, { params: { id } }: Props) => {
  if (!id)
    return NextResponse.json({ error: 'userId is required' }, { status: 400 });
  const checkUser = await UserClass.checkExisitingUser(id, undefined);
  if (!checkUser)
    return NextResponse.json(
      { error: 'user with the provided params not found' },
      { status: 404 }
    );
  const deleteUser = await prisma.user.delete({
    where: { id },
  });
  return NextResponse.json({ message: 'user deleted' }, { status: 200 });
};

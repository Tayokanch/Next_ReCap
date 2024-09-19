import { NextRequest, NextResponse } from 'next/server';

export const GET = (req: NextRequest, res: NextResponse) => {
  return NextResponse.json([
    { id: 1, name: 'Milk', price: 2.7 },
    { id: 2, name: 'Bread', price: 1.32 },
  ]);
};

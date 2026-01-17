import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    'https://goit-final-project-e6d7.onrender.com/api/emotions',
    { cache: 'no-store' }
  );

  const data = await res.json();
  return NextResponse.json(data);
}

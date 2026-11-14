import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/server/auth';

export async function GET() {
  const isAuthenticated = await getAdminSession();
  return NextResponse.json({ authenticated: isAuthenticated });
}

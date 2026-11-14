import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { clearAdminSession } from '@/lib/server/auth';

export async function POST() {
  try {
    await clearAdminSession();
    const cookieStore = await cookies();
    cookieStore.delete('nippon_gateway_pass');
    return NextResponse.json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Failed to logout' }, { status: 500 });
  }
}

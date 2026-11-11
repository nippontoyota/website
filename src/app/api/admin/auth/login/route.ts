import { NextResponse } from 'next/server';
import { verifyPassword, setAdminSession } from '@/lib/server/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const isValid = verifyPassword(password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid password. Access denied.' }, { status: 401 });
    }

    await setAdminSession();
    return NextResponse.json({ success: true, message: 'Authenticated successfully' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error during authentication' }, { status: 500 });
  }
}

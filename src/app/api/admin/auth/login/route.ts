import { NextResponse } from 'next/server';
import { verifyPassword, setAdminSession } from '@/lib/server/auth';

// Rate limiting: max 5 failed attempts per IP within 15 minutes
interface RateLimitRecord {
  attempts: number;
  lockedUntil?: number;
}

const failedAttempts = new Map<string, RateLimitRecord>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'local-client';

    const now = Date.now();
    const record = failedAttempts.get(ip);

    // Check if locked out
    if (record?.lockedUntil && record.lockedUntil > now) {
      const remainingMin = Math.ceil((record.lockedUntil - now) / 60000);
      return NextResponse.json(
        { error: `Too many failed attempts. Security lockout active. Please wait ${remainingMin} minute(s).` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    const isValid = verifyPassword(password);
    if (!isValid) {
      const current = failedAttempts.get(ip) || { attempts: 0 };
      const attempts = current.attempts + 1;

      if (attempts >= MAX_ATTEMPTS) {
        failedAttempts.set(ip, {
          attempts,
          lockedUntil: now + LOCKOUT_DURATION_MS,
        });
        return NextResponse.json(
          { error: 'Maximum attempts exceeded. This IP has been locked out for 15 minutes.' },
          { status: 429 }
        );
      } else {
        failedAttempts.set(ip, { attempts });
        return NextResponse.json(
          { error: `Invalid password. (${MAX_ATTEMPTS - attempts} attempt(s) remaining)` },
          { status: 401 }
        );
      }
    }

    // Success: clear rate limit record & grant session
    failedAttempts.delete(ip);
    await setAdminSession();
    return NextResponse.json({ success: true, message: 'Authenticated successfully' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error during authentication' }, { status: 500 });
  }
}

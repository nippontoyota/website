import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'nippon_admin_session';
const SESSION_MAX_AGE_SECONDS = 7 * 24 * 60 * 60; // 7 days

function getSecret(): string {
  return process.env.ADMIN_SECRET || 'nippon-toyota-kerala-secure-salt-2026';
}

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || 'nippon2026';
}

export function verifyPassword(password: string): boolean {
  const expected = getAdminPassword();
  if (typeof password !== 'string') return false;
  
  const expectedBuffer = Buffer.from(expected);
  const actualBuffer = Buffer.from(password);
  
  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }
  
  return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
}

export function createSessionToken(): string {
  const timestamp = Date.now().toString();
  const secret = getSecret();
  const hmac = crypto.createHmac('sha256', secret).update(`session:${timestamp}`).digest('hex');
  return `${timestamp}.${hmac}`;
}

export function verifySessionToken(token?: string | null): boolean {
  if (!token || typeof token !== 'string') return false;
  
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  
  const [timestampStr, actualHmac] = parts;
  const timestamp = parseInt(timestampStr, 10);
  if (isNaN(timestamp)) return false;
  
  // Check age: 7 days
  const now = Date.now();
  if (now - timestamp > SESSION_MAX_AGE_SECONDS * 1000 || timestamp > now + 60000) {
    return false;
  }
  
  const secret = getSecret();
  const expectedHmac = crypto.createHmac('sha256', secret).update(`session:${timestampStr}`).digest('hex');
  
  const expectedBuffer = Buffer.from(expectedHmac);
  const actualBuffer = Buffer.from(actualHmac);
  
  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }
  
  return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
}

export async function getAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    return verifySessionToken(token);
  } catch (error) {
    console.error('Error reading admin session cookie:', error);
    return false;
  }
}

export async function setAdminSession(): Promise<void> {
  const token = createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

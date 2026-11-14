import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/server/auth';
import {
  getStoreData,
  updateSocialLinks,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from '@/lib/server/db';
import { SocialLink } from '@/lib/types/admin';

export async function GET() {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const store = await getStoreData();
    return NextResponse.json({ socialLinks: store.socialLinks || [] });
  } catch (error) {
    console.error('Failed to get social links:', error);
    return NextResponse.json({ error: 'Failed to retrieve social links' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { platform, label, url, handle, enabled } = body;

    if (!platform || !label || !url) {
      return NextResponse.json(
        { error: 'Platform, label, and URL are required.' },
        { status: 400 }
      );
    }

    const created = await addSocialLink({
      platform,
      label,
      url,
      handle: handle || '',
      enabled: enabled !== false,
    });

    return NextResponse.json({ success: true, socialLink: created }, { status: 201 });
  } catch (error) {
    console.error('Failed to create social link:', error);
    return NextResponse.json({ error: 'Failed to create social link' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Batch update array of social links
    if (Array.isArray(body.socialLinks)) {
      await updateSocialLinks(body.socialLinks as SocialLink[]);
      return NextResponse.json({ success: true, message: 'Social links updated successfully' });
    }

    // Single link update or toggle
    if (body.id) {
      const updated = await updateSocialLink(body.id, body);
      return NextResponse.json({ success: true, socialLink: updated });
    }

    return NextResponse.json({ error: 'Invalid update payload' }, { status: 400 });
  } catch (error) {
    console.error('Failed to update social links:', error);
    return NextResponse.json({ error: 'Failed to update social links' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Social link ID is required' }, { status: 400 });
    }

    await deleteSocialLink(id);
    return NextResponse.json({ success: true, message: 'Social link removed' });
  } catch (error) {
    console.error('Failed to delete social link:', error);
    return NextResponse.json({ error: 'Failed to delete social link' }, { status: 500 });
  }
}

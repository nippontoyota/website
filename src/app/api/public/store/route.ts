import { NextResponse } from 'next/server';
import { getStoreData } from '@/lib/server/db';

export async function GET() {
  try {
    const store = await getStoreData();
    // Exclude leads for privacy
    const publicData = {
      version: store.version,
      lastUpdated: store.lastUpdated,
      vehicles: store.vehicles,
      heroCards: store.heroCards.filter((c) => c.enabled),
      campaigns: store.campaigns,
      branches: store.branches,
      rtoConfig: store.rtoConfig,
      socialLinks: store.socialLinks?.filter((s) => s.enabled) || [],
    };

    return NextResponse.json(publicData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error) {
    console.error('Error fetching public store:', error);
    return NextResponse.json({ error: 'Failed to retrieve public catalog' }, { status: 500 });
  }
}

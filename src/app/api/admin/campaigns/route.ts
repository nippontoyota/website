import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/server/auth';
import { getStoreData, updateHeroCards, updateCampaigns } from '@/lib/server/db';
import { HeroActionCard, CampaignSettings } from '@/lib/types/admin';

export async function GET() {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const store = await getStoreData();
    return NextResponse.json({
      heroCards: store.heroCards,
      campaigns: store.campaigns,
    });
  } catch (error) {
    console.error('Failed to get campaigns:', error);
    return NextResponse.json({ error: 'Failed to retrieve campaigns' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, heroCards, announcementBar, exitIntentOffer, campaigns } = body;

    const store = await getStoreData();

    if (type === 'heroCards' && Array.isArray(heroCards)) {
      await updateHeroCards(heroCards as HeroActionCard[]);
      return NextResponse.json({ success: true, message: 'Hero cards updated successfully' });
    }

    if (type === 'announcementBar' && announcementBar) {
      const nextCampaigns: CampaignSettings = {
        ...store.campaigns,
        announcementBar,
      };
      await updateCampaigns(nextCampaigns);
      return NextResponse.json({ success: true, message: 'Announcement bar updated' });
    }

    if (type === 'exitIntent' && exitIntentOffer) {
      const nextCampaigns: CampaignSettings = {
        ...store.campaigns,
        exitIntentOffer,
      };
      await updateCampaigns(nextCampaigns);
      return NextResponse.json({ success: true, message: 'Exit-intent offer updated' });
    }

    if (campaigns) {
      await updateCampaigns(campaigns as CampaignSettings);
      return NextResponse.json({ success: true, message: 'All campaigns updated' });
    }

    return NextResponse.json({ error: 'Invalid campaign update payload' }, { status: 400 });
  } catch (error: unknown) {
    console.error('Campaign update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update campaign' },
      { status: 500 }
    );
  }
}

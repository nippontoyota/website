import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/server/auth';
import {
  getStoreData,
  saveStoreData,
  updateVehicles,
  updateHeroCards,
  updateCampaigns,
  updateBranches,
  updateRtoConfig,
} from '@/lib/server/db';
import { NipponStoreData, RegionalRTOConfig } from '@/lib/types/admin';

export async function GET() {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await getStoreData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to get store data:', error);
    return NextResponse.json({ error: 'Failed to retrieve store data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { section, data } = body;

    if (section === 'vehicles' && Array.isArray(data)) {
      await updateVehicles(data);
    } else if (section === 'heroCards' && Array.isArray(data)) {
      await updateHeroCards(data);
    } else if (section === 'campaigns' && data) {
      await updateCampaigns(data);
    } else if (section === 'branches' && Array.isArray(data)) {
      await updateBranches(data);
    } else if (section === 'rtoConfig' && data) {
      await updateRtoConfig(data as RegionalRTOConfig);
    } else if (!section && data && data.vehicles) {
      // Full store update
      await saveStoreData(data as NipponStoreData);
    } else {
      return NextResponse.json({ error: 'Invalid update payload' }, { status: 400 });
    }

    const updated = await getStoreData();
    return NextResponse.json({ success: true, lastUpdated: updated.lastUpdated, store: updated });
  } catch (error) {
    console.error('Failed to update store data:', error);
    return NextResponse.json({ error: 'Failed to update store data' }, { status: 500 });
  }
}

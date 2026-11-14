import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/server/auth';
import { getStoreData, updateVehicle } from '@/lib/server/db';

export async function GET() {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const store = await getStoreData();
    const brochureList = store.vehicles.map((v) => ({
      id: v.id,
      slug: v.slug,
      name: v.name,
      fullName: v.fullName,
      image: v.image,
      category: v.category,
      brochureUrl: v.brochureUrl || null,
      status: v.status,
    }));

    return NextResponse.json(brochureList);
  } catch (error) {
    console.error('Failed to get brochures:', error);
    return NextResponse.json({ error: 'Failed to retrieve brochures' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { vehicleId, brochureUrl } = body;

    if (!vehicleId) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    const updated = await updateVehicle(vehicleId, {
      brochureUrl: brochureUrl ? brochureUrl.trim() : undefined,
    });

    return NextResponse.json({ success: true, vehicle: updated });
  } catch (error: unknown) {
    console.error('Failed to update brochure:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update brochure' },
      { status: 500 }
    );
  }
}

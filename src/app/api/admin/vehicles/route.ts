import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/server/auth';
import { getStoreData, updateVehicle, addVehicle, deleteVehicle, updateVehicles } from '@/lib/server/db';
import { VehicleModel } from '@/lib/types/admin';

export async function GET() {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const store = await getStoreData();
    return NextResponse.json(store.vehicles);
  } catch (error) {
    console.error('Failed to get vehicles:', error);
    return NextResponse.json({ error: 'Failed to retrieve vehicles' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = (await request.json()) as VehicleModel;
    if (!body.name || !body.slug) {
      return NextResponse.json({ error: 'Model Name and Slug are required' }, { status: 400 });
    }

    const created = await addVehicle(body);
    return NextResponse.json({ success: true, vehicle: created }, { status: 201 });
  } catch (error: unknown) {
    console.error('Failed to add vehicle:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to add vehicle' },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Check if reordering / updating whole list
    if (Array.isArray(body)) {
      await updateVehicles(body as VehicleModel[]);
      return NextResponse.json({ success: true, message: 'Vehicles reordered successfully' });
    }

    // Single vehicle update
    const { id, ...partial } = body;
    if (!id) {
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    const updated = await updateVehicle(id, partial);
    return NextResponse.json({ success: true, vehicle: updated });
  } catch (error: unknown) {
    console.error('Failed to update vehicle:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update vehicle' },
      { status: 400 }
    );
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
      return NextResponse.json({ error: 'Vehicle ID is required' }, { status: 400 });
    }

    await deleteVehicle(id);
    return NextResponse.json({ success: true, message: 'Vehicle deleted successfully' });
  } catch (error: unknown) {
    console.error('Failed to delete vehicle:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to delete vehicle' },
      { status: 400 }
    );
  }
}

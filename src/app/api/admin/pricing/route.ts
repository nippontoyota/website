import { NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/server/auth';
import { getStoreData, updateVehicles, updateRtoConfig, updateVehicle } from '@/lib/server/db';
import { VehicleModel, RegionalRTOConfig } from '@/lib/types/admin';

export async function GET() {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const store = await getStoreData();
    return NextResponse.json({
      vehicles: store.vehicles,
      rtoConfig: store.rtoConfig,
    });
  } catch (error) {
    console.error('Failed to get pricing data:', error);
    return NextResponse.json({ error: 'Failed to retrieve pricing data' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const isAuth = await getAdminSession();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { type, vehicles, config, vehicleId, variantId, newPrice } = body;

    if (type === 'rtoConfig' && config) {
      await updateRtoConfig(config as RegionalRTOConfig);
      return NextResponse.json({ success: true, message: 'Kerala RTO config updated successfully' });
    }

    if (type === 'vehicles' && Array.isArray(vehicles)) {
      await updateVehicles(vehicles as VehicleModel[]);
      return NextResponse.json({ success: true, message: 'Vehicle prices updated successfully' });
    }

    if (type === 'variant' && vehicleId && variantId && newPrice) {
      const store = await getStoreData();
      const vehicle = store.vehicles.find((v) => v.id === vehicleId || v.slug === vehicleId);
      if (!vehicle) {
        return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
      }

      const variantIndex = vehicle.variants.findIndex((v) => v.id === variantId);
      if (variantIndex === -1) {
        return NextResponse.json({ error: 'Variant not found' }, { status: 404 });
      }

      vehicle.variants[variantIndex].price = newPrice;
      await updateVehicle(vehicle.id, { variants: vehicle.variants });
      return NextResponse.json({ success: true, message: 'Variant price updated', vehicle });
    }

    return NextResponse.json({ error: 'Invalid pricing update payload' }, { status: 400 });
  } catch (error: unknown) {
    console.error('Pricing update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update pricing' },
      { status: 500 }
    );
  }
}

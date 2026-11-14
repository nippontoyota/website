import { getStoreData } from '@/lib/server/db';
import VehicleList from '@/components/admin/VehicleList';

export const dynamic = 'force-dynamic';

export default async function AdminVehiclesPage() {
  const store = await getStoreData();

  return <VehicleList initialVehicles={store.vehicles} />;
}

import { getStoreData } from '@/lib/server/db';
import PricingManager from '@/components/admin/PricingManager';

export const dynamic = 'force-dynamic';

export default async function AdminPricingPage() {
  const store = await getStoreData();

  return (
    <PricingManager
      initialVehicles={store.vehicles}
      initialRtoConfig={store.rtoConfig!}
    />
  );
}

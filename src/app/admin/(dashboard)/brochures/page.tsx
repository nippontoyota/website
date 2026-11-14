import { getStoreData } from '@/lib/server/db';
import BrochureManager from '@/components/admin/BrochureManager';

export const dynamic = 'force-dynamic';

export default async function AdminBrochuresPage() {
  const store = await getStoreData();

  return <BrochureManager initialVehicles={store.vehicles} />;
}

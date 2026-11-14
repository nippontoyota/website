import { getStoreData } from '@/lib/server/db';
import LeadsManager from '@/components/admin/LeadsManager';

export const dynamic = 'force-dynamic';

export default async function AdminLeadsPage() {
  const store = await getStoreData();

  return <LeadsManager initialLeads={store.leads} />;
}

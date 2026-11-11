import { getStoreData } from '@/lib/server/db';
import BranchManager from '@/components/admin/BranchManager';

export const dynamic = 'force-dynamic';

export default async function AdminBranchesPage() {
  const store = await getStoreData();

  return <BranchManager initialBranches={store.branches} />;
}

import { getStoreData } from '@/lib/server/db';
import CampaignManager from '@/components/admin/CampaignManager';

export const dynamic = 'force-dynamic';

export default async function AdminCampaignsPage() {
  const store = await getStoreData();

  return (
    <CampaignManager
      initialHeroCards={store.heroCards}
      initialCampaigns={store.campaigns}
    />
  );
}

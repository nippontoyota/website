import { getStoreData } from '@/lib/server/db';
import SocialManager from '@/components/admin/SocialManager';

export const dynamic = 'force-dynamic';

export default async function AdminSocialsPage() {
  const store = await getStoreData();

  return <SocialManager initialSocialLinks={store.socialLinks || []} />;
}

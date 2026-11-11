import { redirect } from 'next/navigation';
import { getAdminSession } from '@/lib/server/auth';
import AdminShell from '@/components/admin/AdminShell';

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = await getAdminSession();

  if (!isAuthenticated) {
    redirect('/admin/login');
  }

  return <AdminShell>{children}</AdminShell>;
}

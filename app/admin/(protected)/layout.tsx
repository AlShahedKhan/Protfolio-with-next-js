import { redirect } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import { getVerifiedAdminSession } from '@/lib/admin-auth';
import { ADMIN_LOGIN_PATH } from '@/lib/admin-auth-constants';

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getVerifiedAdminSession();

  if (!session) {
    redirect(ADMIN_LOGIN_PATH);
  }

  return <AdminShell user={session.user}>{children}</AdminShell>;
}

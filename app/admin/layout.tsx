import { notFound } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import { siteFeatures } from '@/lib/site-config';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!siteFeatures.adminPreview) {
    notFound();
  }

  return <AdminShell>{children}</AdminShell>;
}

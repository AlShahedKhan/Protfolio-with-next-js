import { notFound } from 'next/navigation';
import { siteFeatures } from '@/lib/site-config';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!siteFeatures.adminPreview) {
    notFound();
  }

  return children;
}

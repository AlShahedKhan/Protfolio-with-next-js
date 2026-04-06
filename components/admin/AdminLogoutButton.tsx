'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';
import { ADMIN_LOGIN_PATH } from '@/lib/admin-auth-constants';

export default function AdminLogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });

      router.replace(ADMIN_LOGIN_PATH);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isPending}
      className="flex items-center gap-2 rounded-lg px-4 py-2 transition-colors duration-300 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <LogOut size={20} />
      <span className="text-sm">{isPending ? 'Signing out...' : 'Logout'}</span>
    </button>
  );
}

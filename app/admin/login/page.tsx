import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import AdminLoginForm from '@/components/admin/AdminLoginForm';
import { getVerifiedAdminSession } from '@/lib/admin-auth';
import { isAdminQuickLoginEnabled } from '@/lib/admin-auth-env';
import { ADMIN_HOME_PATH } from '@/lib/admin-auth-constants';

export default async function AdminLoginPage() {
  const session = await getVerifiedAdminSession();
  const allowQuickLogin = isAdminQuickLoginEnabled();

  if (session) {
    redirect(ADMIN_HOME_PATH);
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.15),_transparent_24%)]" />
      <section className="container-max flex min-h-screen items-center justify-center py-16">
        <div className="w-full max-w-md space-y-8 rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-[0_30px_80px_rgba(2,6,23,0.45)] backdrop-blur-xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-cyan-300"
              >
                <ArrowLeft size={16} />
                Back to portfolio
              </Link>

              <div className="inline-flex rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-3">
                <ShieldCheck className="h-6 w-6 text-cyan-300" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">
                Admin Access
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Sign in to manage portfolio content
              </h1>
              <p className="text-sm leading-6 text-slate-400">
                This login uses your Laravel backend and keeps the access token in a secure{' '}
                <span className="font-mono text-slate-300">httpOnly</span> cookie on the Next.js
                side.
              </p>
            </div>
          </div>

          <AdminLoginForm allowQuickLogin={allowQuickLogin} />
        </div>
      </section>
    </main>
  );
}

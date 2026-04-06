'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockKeyhole, LogIn, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { ADMIN_HOME_PATH } from '@/lib/admin-auth-constants';
import { adminLoginSchema, type AdminLoginInput } from '@/lib/admin-auth-schema';

type LoginResponseBody = {
  message?: string;
  errors?: Record<string, string[]>;
};

const getSafeRedirect = (value: string | null) =>
  value && value.startsWith('/admin') ? value : ADMIN_HOME_PATH;

export default function AdminLoginForm({ allowQuickLogin }: { allowQuickLogin: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = getSafeRedirect(searchParams.get('next'));
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AdminLoginInput>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      clearErrors();
      setFormError(null);

      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(values),
      });

      const body = (await response.json().catch(() => null)) as LoginResponseBody | null;

      if (!response.ok) {
        const fieldErrors = body?.errors;

        if (fieldErrors?.email?.[0]) {
          setError('email', { type: 'server', message: fieldErrors.email[0] });
        }

        if (fieldErrors?.password?.[0]) {
          setError('password', { type: 'server', message: fieldErrors.password[0] });
        }

        if (!fieldErrors?.email?.[0] && !fieldErrors?.password?.[0]) {
          setFormError(body?.message ?? 'Unable to sign in right now.');
        }

        return;
      }

      router.replace(redirectTo);
      router.refresh();
    });
  });

  const handleQuickLogin = () => {
    startTransition(async () => {
      clearErrors();
      setFormError(null);

      const response = await fetch('/api/admin/auth/quick-login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      });

      const body = (await response.json().catch(() => null)) as LoginResponseBody | null;

      if (!response.ok) {
        setFormError(body?.message ?? 'Unable to sign in right now.');
        return;
      }

      router.replace(redirectTo);
      router.refresh();
    });
  };

  const isBusy = isPending || isSubmitting;

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-slate-200">
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white outline-none transition-colors focus:border-cyan-400"
          placeholder="admin@test.com"
        />
        {errors.email && <p className="text-sm text-red-300">{errors.email.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-slate-200">
          Password
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          {...register('password')}
          className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white outline-none transition-colors focus:border-cyan-400"
          placeholder="Password123!"
        />
        {errors.password && <p className="text-sm text-red-300">{errors.password.message}</p>}
      </div>

      {formError && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {formError}
        </div>
      )}

      {allowQuickLogin && (
        <button
          type="button"
          onClick={handleQuickLogin}
          disabled={isBusy}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-500/30 bg-cyan-500/10 px-5 py-3 font-semibold text-cyan-100 transition-all hover:bg-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Sparkles size={18} />
          Quick sign in as admin
        </button>
      )}

      <button
        type="submit"
        disabled={isBusy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 font-semibold text-white transition-all hover:from-cyan-600 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isBusy ? <LockKeyhole size={18} /> : <LogIn size={18} />}
        {isBusy ? 'Signing in...' : 'Sign in to admin'}
      </button>
    </form>
  );
}

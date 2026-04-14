import 'server-only';

import { NextResponse } from 'next/server';
import { clearAdminAuthCookies, getAdminSession } from '@/lib/admin-auth';
import { fetchLaravelApi } from '@/lib/laravel-api';

export async function createAdminLogoutResponse() {
  const session = await getAdminSession();
  let backendLoggedOut = false;

  if (session?.accessToken) {
    try {
      const { response: backendResponse } = await fetchLaravelApi('/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${session.accessToken}`,
        },
        cache: 'no-store',
      });

      backendLoggedOut = backendResponse?.ok ?? false;
    } catch {
      backendLoggedOut = false;
    }
  }

  const response = NextResponse.json({
    success: true,
    backend_logged_out: backendLoggedOut,
  });

  clearAdminAuthCookies(response);
  return response;
}

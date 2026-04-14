import 'server-only';

import { NextResponse } from 'next/server';
import type { AdminLoginInput } from '@/lib/admin-auth-schema';
import {
  clearAdminAuthCookies,
  LaravelAdminLoginResponse,
  setAdminAuthCookies,
} from '@/lib/admin-auth';
import { fetchLaravelApi, getLaravelApiUrl } from '@/lib/laravel-api';

type BackendJson = Record<string, unknown> | null;

const parseBackendResponse = async (response: Response): Promise<BackendJson> => {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { message: text };
  }
};

export async function createAdminLoginResponse(payload: AdminLoginInput) {
  const loginUrl = getLaravelApiUrl('/api/v1/auth/login');

  const { response: backendResponse } = await fetchLaravelApi('/api/v1/auth/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
  });

  if (!backendResponse) {
    const response = NextResponse.json(
      {
        message: `Unable to reach the authentication server. Make sure ${loginUrl} is reachable from the Next.js server.`,
      },
      { status: 502 }
    );

    clearAdminAuthCookies(response);
    return response;
  }

  const backendBody = await parseBackendResponse(backendResponse);

  if (!backendResponse.ok) {
    const response = NextResponse.json(
      {
        message:
          (backendBody?.message as string | undefined) ??
          'Unable to sign in with those credentials.',
        errors: (backendBody?.errors as Record<string, string[]> | undefined) ?? undefined,
      },
      { status: backendResponse.status }
    );

    clearAdminAuthCookies(response);
    return response;
  }

  const loginResponse = backendBody as unknown as LaravelAdminLoginResponse;

  if (
    loginResponse?.token_type !== 'Bearer' ||
    !loginResponse?.access_token ||
    !loginResponse?.user
  ) {
    const response = NextResponse.json(
      {
        message: 'The authentication server returned an unexpected response.',
      },
      { status: 502 }
    );

    clearAdminAuthCookies(response);
    return response;
  }

  if (!loginResponse.user.is_admin) {
    const response = NextResponse.json(
      {
        message: 'This account does not have admin access.',
      },
      { status: 403 }
    );

    clearAdminAuthCookies(response);
    return response;
  }

  const response = NextResponse.json(
    {
      user: loginResponse.user,
      expires_at: loginResponse.expires_at,
    },
    { status: 200 }
  );

  setAdminAuthCookies(response, loginResponse);
  return response;
}

import 'server-only';

import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ADMIN_ACCESS_TOKEN_COOKIE, ADMIN_SESSION_COOKIE } from '@/lib/admin-auth-constants';
import { fetchLaravelApi, getLaravelApiUrl } from '@/lib/laravel-api';

export { getLaravelApiBaseUrl, getLaravelApiUrl } from '@/lib/laravel-api';

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  email_verified_at: string | null;
  created_at: string;
}

export interface LaravelAdminLoginResponse {
  token_type: 'Bearer';
  access_token: string;
  expires_at: string | null;
  user: AdminUser;
}

interface LaravelAdminMeResponse {
  data: AdminUser;
}

export interface AdminSession {
  accessToken: string;
  expiresAt: string | null;
  user: AdminUser;
}

type AdminSessionPayload = {
  expiresAt: string | null;
  user: AdminUser;
};

const parseBooleanEnv = (value: string | undefined) => {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  if (['1', 'true', 'yes', 'on'].includes(normalized)) {
    return true;
  }

  if (['0', 'false', 'no', 'off'].includes(normalized)) {
    return false;
  }

  return null;
};

const explicitSecureCookie = parseBooleanEnv(process.env.ADMIN_AUTH_COOKIE_SECURE);
const isProduction = process.env.NODE_ENV === 'production';
const useSecureCookies = explicitSecureCookie ?? isProduction;

const isValidDate = (value: Date) => !Number.isNaN(value.getTime());

const parseSessionPayload = (rawValue: string): AdminSessionPayload | null => {
  try {
    const parsed = JSON.parse(rawValue) as Partial<AdminSessionPayload>;

    if (!parsed?.user || typeof parsed.user !== 'object') {
      return null;
    }

    return {
      user: parsed.user as AdminUser,
      expiresAt: typeof parsed.expiresAt === 'string' ? parsed.expiresAt : null,
    };
  } catch {
    return null;
  }
};

const getCookieExpiry = (expiresAt: string | null) => {
  if (!expiresAt) {
    return undefined;
  }

  const parsed = new Date(expiresAt);
  return isValidDate(parsed) ? parsed : undefined;
};

export const clearAdminAuthCookies = (response: NextResponse) => {
  response.cookies.set({
    name: ADMIN_ACCESS_TOKEN_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: useSecureCookies,
    path: '/',
    expires: new Date(0),
  });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: '',
    httpOnly: true,
    sameSite: 'lax',
    secure: useSecureCookies,
    path: '/',
    expires: new Date(0),
  });
};

export const setAdminAuthCookies = (
  response: NextResponse,
  payload: LaravelAdminLoginResponse
) => {
  const expires = getCookieExpiry(payload.expires_at);
  const sessionPayload: AdminSessionPayload = {
    expiresAt: payload.expires_at,
    user: payload.user,
  };

  response.cookies.set({
    name: ADMIN_ACCESS_TOKEN_COOKIE,
    value: payload.access_token,
    httpOnly: true,
    sameSite: 'lax',
    secure: useSecureCookies,
    path: '/',
    ...(expires ? { expires } : {}),
  });

  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: JSON.stringify(sessionPayload),
    httpOnly: true,
    sameSite: 'lax',
    secure: useSecureCookies,
    path: '/',
    ...(expires ? { expires } : {}),
  });
};

export const getAdminSession = async (): Promise<AdminSession | null> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ADMIN_ACCESS_TOKEN_COOKIE)?.value;
  const sessionRaw = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!accessToken || !sessionRaw) {
    return null;
  }

  const session = parseSessionPayload(sessionRaw);

  if (!session?.user?.is_admin) {
    return null;
  }

  if (session.expiresAt) {
    const expiresAt = new Date(session.expiresAt);

    if (!isValidDate(expiresAt) || expiresAt <= new Date()) {
      return null;
    }
  }

  return {
    accessToken,
    expiresAt: session.expiresAt,
    user: session.user,
  };
};

export const getVerifiedAdminSession = async (): Promise<AdminSession | null> => {
  const session = await getAdminSession();

  if (!session) {
    return null;
  }

  try {
    const { response } = await fetchLaravelApi('/api/v1/auth/me', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${session.accessToken}`,
      },
      cache: 'no-store',
    });

    if (!response?.ok) {
      return null;
    }

    const payload = (await response.json()) as Partial<LaravelAdminMeResponse>;
    const user = payload?.data;

    if (!user?.is_admin) {
      return null;
    }

    return {
      accessToken: session.accessToken,
      expiresAt: session.expiresAt,
      user,
    };
  } catch {
    return null;
  }
};

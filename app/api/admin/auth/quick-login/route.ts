import { NextResponse } from 'next/server';
import { clearAdminAuthCookies } from '@/lib/admin-auth';
import { getAdminQuickLoginCredentials } from '@/lib/admin-auth-env';
import { createAdminLoginResponse } from '@/lib/admin-auth-login';

export async function POST() {
  const credentials = getAdminQuickLoginCredentials();

  if (!credentials) {
    const response = NextResponse.json(
      {
        message: 'Quick admin sign-in is not enabled for this environment.',
      },
      { status: 404 }
    );

    clearAdminAuthCookies(response);
    return response;
  }

  try {
    return await createAdminLoginResponse(credentials);
  } catch {
    const response = NextResponse.json(
      {
        message: 'Unable to complete quick admin sign-in right now.',
      },
      { status: 500 }
    );

    clearAdminAuthCookies(response);
    return response;
  }
}

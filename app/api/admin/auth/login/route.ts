import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { adminLoginSchema } from '@/lib/admin-auth-schema';
import { clearAdminAuthCookies, getLaravelApiUrl } from '@/lib/admin-auth';
import { createAdminLoginResponse } from '@/lib/admin-auth-login';

const createValidationErrorResponse = (error: ZodError) =>
  NextResponse.json(
    {
      message: 'The given data was invalid.',
      errors: error.flatten().fieldErrors,
    },
    { status: 422 }
  );

export async function POST(request: Request) {
  try {
    const payload = adminLoginSchema.parse(await request.json());
    return createAdminLoginResponse(payload);
  } catch (error) {
    if (error instanceof ZodError) {
      return createValidationErrorResponse(error);
    }

    const response = NextResponse.json(
      {
        message: `Unable to reach the authentication server. Check LARAVEL_API_BASE_URL and make sure ${getLaravelApiUrl('/api/v1/auth/login')} is reachable from the Next.js server.`,
      },
      { status: 500 }
    );

    clearAdminAuthCookies(response);
    return response;
  }
}

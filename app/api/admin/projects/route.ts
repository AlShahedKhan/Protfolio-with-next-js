import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { proxyAdminJsonRequest } from '@/lib/admin-api';
import { adminProjectCreateSchema } from '@/lib/admin-projects';

const createValidationErrorResponse = (error: ZodError) =>
  NextResponse.json(
    {
      message: 'The given data was invalid.',
      errors: error.flatten().fieldErrors,
    },
    { status: 422 }
  );

export async function GET() {
  return proxyAdminJsonRequest({
    path: '/api/v1/admin/projects',
  });
}

export async function POST(request: Request) {
  try {
    const payload = adminProjectCreateSchema.parse(await request.json());

    return proxyAdminJsonRequest({
      path: '/api/v1/admin/projects',
      method: 'POST',
      body: payload,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return createValidationErrorResponse(error);
    }

    return NextResponse.json(
      {
        message: 'Unable to create the project right now.',
      },
      { status: 500 }
    );
  }
}

import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { proxyAdminJsonRequest } from '@/lib/admin-api';
import { adminProjectSlugSchema, adminProjectUpdateSchema } from '@/lib/admin-projects';

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

const createValidationErrorResponse = (error: ZodError) =>
  NextResponse.json(
    {
      message: 'The given data was invalid.',
      errors: error.flatten().fieldErrors,
      formErrors: error.flatten().formErrors,
    },
    { status: 422 }
  );

const getValidatedSlug = async ({ params }: RouteContext) => {
  const resolvedParams = await params;
  return adminProjectSlugSchema.parse(resolvedParams).slug;
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const slug = await getValidatedSlug(context);

    return proxyAdminJsonRequest({
      path: `/api/v1/admin/projects/${encodeURIComponent(slug)}`,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return createValidationErrorResponse(error);
    }

    return NextResponse.json(
      {
        message: 'Unable to load the project right now.',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const slug = await getValidatedSlug(context);
    const payload = adminProjectUpdateSchema.parse(await request.json());

    return proxyAdminJsonRequest({
      path: `/api/v1/admin/projects/${encodeURIComponent(slug)}`,
      method: 'PATCH',
      body: payload,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return createValidationErrorResponse(error);
    }

    return NextResponse.json(
      {
        message: 'Unable to update the project right now.',
      },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const slug = await getValidatedSlug(context);

    return proxyAdminJsonRequest({
      path: `/api/v1/admin/projects/${encodeURIComponent(slug)}`,
      method: 'DELETE',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return createValidationErrorResponse(error);
    }

    return NextResponse.json(
      {
        message: 'Unable to delete the project right now.',
      },
      { status: 500 }
    );
  }
}

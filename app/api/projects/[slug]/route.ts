import { NextResponse } from 'next/server';
import { fetchLaravelApi } from '@/lib/laravel-api';

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  try {
    const { response } = await fetchLaravelApi(`/api/v1/projects/${encodeURIComponent(slug)}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response) {
      return NextResponse.json(
        {
          message:
            'Unable to reach the public project detail backend right now. Check that the Laravel API is running and reachable from the Next.js server.',
        },
        { status: 502 }
      );
    }

    const payload = await response.text();

    return new NextResponse(payload, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') ?? 'application/json',
      },
    });
  } catch {
    return NextResponse.json(
      {
        message:
          'Unable to reach the public project detail backend right now. Check that the Laravel API is running and reachable from the Next.js server.',
      },
      { status: 502 }
    );
  }
}

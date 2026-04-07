import { NextResponse } from 'next/server';
import { getLaravelApiUrl } from '@/lib/laravel-api';

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;

  try {
    const response = await fetch(getLaravelApiUrl(`/api/v1/projects/${encodeURIComponent(slug)}`), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

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

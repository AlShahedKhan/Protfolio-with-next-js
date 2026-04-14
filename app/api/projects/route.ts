import { NextResponse } from 'next/server';
import { fetchLaravelApi } from '@/lib/laravel-api';
import { PUBLIC_PROJECTS_PER_PAGE } from '@/lib/public-projects';

export async function GET(request: Request) {
  try {
    const incomingUrl = new URL(request.url);
    if (!incomingUrl.searchParams.has('per_page')) {
      incomingUrl.searchParams.set('per_page', String(PUBLIC_PROJECTS_PER_PAGE));
    }

    const queryString = incomingUrl.searchParams.toString();
    const path = queryString ? `/api/v1/projects?${queryString}` : '/api/v1/projects';

    const { response } = await fetchLaravelApi(path, {
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
            'Unable to reach the public projects backend right now. Check that the Laravel API is running and reachable from the Next.js server.',
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
          'Unable to reach the public projects backend right now. Check that the Laravel API is running and reachable from the Next.js server.',
      },
      { status: 502 }
    );
  }
}

import 'server-only';

import { NextResponse } from 'next/server';
import { clearAdminAuthCookies, getAdminSession, getLaravelApiUrl } from '@/lib/admin-auth';

type JsonLike = Record<string, unknown> | unknown[] | null;

const toResponseBody = (body: JsonLike | string) => {
  if (typeof body === 'string') {
    return { message: body };
  }

  return body ?? {};
};

const parseJsonResponse = async (response: Response): Promise<JsonLike | string> => {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as JsonLike;
  } catch {
    return text;
  }
};

type ProxyOptions = {
  path: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
  body?: unknown;
};

type FormDataProxyOptions = {
  path: string;
  method?: 'POST' | 'PUT' | 'PATCH';
  formData: FormData;
};

const getAuthenticatedHeaders = (accessToken: string) => ({
  Accept: 'application/json',
  Authorization: `Bearer ${accessToken}`,
});

export async function proxyAdminJsonRequest({ path, method = 'GET', body }: ProxyOptions) {
  const session = await getAdminSession();

  if (!session) {
    const response = NextResponse.json(
      {
        message: 'Your admin session has expired. Please sign in again.',
      },
      { status: 401 }
    );

    clearAdminAuthCookies(response);
    return response;
  }

  try {
    const headers: Record<string, string> = getAuthenticatedHeaders(session.accessToken);

    const init: RequestInit = {
      method,
      headers,
      cache: 'no-store',
    };

    if (body !== undefined) {
      headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(body);
    }

    const upstream = await fetch(getLaravelApiUrl(path), init);
    const upstreamBody = await parseJsonResponse(upstream);
    const response = NextResponse.json(toResponseBody(upstreamBody), {
      status: upstream.status,
    });

    if (upstream.status === 401 || upstream.status === 403) {
      clearAdminAuthCookies(response);
    }

    return response;
  } catch {
    return NextResponse.json(
      {
        message: `Unable to reach the admin backend. Make sure ${getLaravelApiUrl(path)} is reachable from the Next.js server.`,
      },
      { status: 502 }
    );
  }
}

export async function proxyAdminFormDataRequest({
  path,
  method = 'POST',
  formData,
}: FormDataProxyOptions) {
  const session = await getAdminSession();

  if (!session) {
    const response = NextResponse.json(
      {
        message: 'Your admin session has expired. Please sign in again.',
      },
      { status: 401 }
    );

    clearAdminAuthCookies(response);
    return response;
  }

  try {
    const upstream = await fetch(getLaravelApiUrl(path), {
      method,
      headers: getAuthenticatedHeaders(session.accessToken),
      body: formData,
      cache: 'no-store',
    });

    const upstreamBody = await parseJsonResponse(upstream);
    const response = NextResponse.json(toResponseBody(upstreamBody), {
      status: upstream.status,
    });

    if (upstream.status === 401 || upstream.status === 403) {
      clearAdminAuthCookies(response);
    }

    return response;
  } catch {
    return NextResponse.json(
      {
        message: `Unable to reach the admin backend. Make sure ${getLaravelApiUrl(path)} is reachable from the Next.js server.`,
      },
      { status: 502 }
    );
  }
}
